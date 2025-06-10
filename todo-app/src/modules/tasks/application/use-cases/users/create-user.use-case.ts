import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import { CreateUserDto } from '../../../domain/dto/create-user.dto';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { IUserRepository } from '../../contracts/user-repository.contract';

@Injectable()
export class CreateUserUseCase implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: CreateUserDto): Promise<User> {
    const newUser = new User(UserId.empty(), input.name);

    const createdUser = await this.userRepository.createUser(newUser);
    return createdUser;
  }
}
