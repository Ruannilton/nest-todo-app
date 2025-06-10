import { UseCase } from 'src/core/contracts/use-case.contract';
import { IIdentityRepository } from '../contracts/identity-repository.contract';
import { SignInDto, SignInOutputDto } from '../../domain/dtos/signin.dto';
import { IUserRepository } from '../../../tasks/application/contracts/user-repository.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignInUseCase implements UseCase {
  constructor(
    private readonly identityRepository: IIdentityRepository,
    private readonly userRepository: IUserRepository, // Assuming userRepository is needed for some reason
  ) {}
  async execute(input: SignInDto): Promise<SignInOutputDto> {
    const { email, password } = input;

    // Retrieve the identity by email
    const identity = await this.identityRepository.getIdentityByEmail(
      email.Address,
    );

    if (!identity) {
      throw new Error('Identity not found');
    }

    const isValid = identity.validatePassword(password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    const user = await this.userRepository.getUserById(identity.userId.Id);
    if (!user) {
      throw new Error('User not found');
    }

    const response = new SignInOutputDto(user.id.Id, identity.email.Address);

    return response;
  }
}
