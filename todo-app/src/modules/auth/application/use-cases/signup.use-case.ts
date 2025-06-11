import { UseCase } from 'src/core/contracts/use-case.contract';
import { SignUpDto, SignUpOutputDto } from '../../domain/dtos/signup.dto';
import { IIdentityRepository } from '../contracts/identity-repository.contract';
import { IUserRepository } from '../../../tasks/application/contracts/user-repository.contract';
import { User } from '../../../tasks/domain/entities/user.entity';
import { UserId } from '../../../tasks/domain/value-objects/user-id';
import { Identity } from '../../domain/entities/identity.entity';
import { Injectable } from '@nestjs/common';
import { EmailAlreadyExistsException } from '../exceptions/email-already-exists-exception';

@Injectable()
export class SignUpUseCase implements UseCase {
  constructor(
    private readonly identityRepository: IIdentityRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: SignUpDto): Promise<SignUpOutputDto> {
    const { email, password } = input;

    // Check if the email already exists
    const existingIdentity = await this.identityRepository.getIdentityByEmail(
      email.Address,
    );

    if (existingIdentity) {
      throw new EmailAlreadyExistsException(email.Address);
    }

    const newUser = new User(UserId.empty(), input.name);
    const createdUser = await this.userRepository.createUser(newUser);

    const identity = Identity.create(createdUser.id, email, password);

    await this.identityRepository.createIdentity(identity);
    const response = new SignUpOutputDto(createdUser.id.Id, email.Address);
    return response;
  }
}
