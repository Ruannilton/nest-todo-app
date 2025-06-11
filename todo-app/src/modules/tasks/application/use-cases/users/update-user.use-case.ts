import { UseCase } from 'src/core/contracts/use-case.contract';
import { UpdateUserDto } from '../../../domain/dto/update-user.dto';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { User } from '../../../domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../exceptions/resource-not-found-exception';

@Injectable()
export class UpdateUserUseCase implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.getUserById(input.id.Id);
    if (!existingUser) {
      throw new ResourceNotFoundException('User', input.id.Id);
    }

    // Update user properties
    existingUser.name = input.name || existingUser.name;

    const updatedUser = await this.userRepository.updateUser(existingUser);
    return updatedUser;
  }
}
