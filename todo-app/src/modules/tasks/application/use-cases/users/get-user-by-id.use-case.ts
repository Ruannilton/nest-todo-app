import { UseCase } from 'src/core/contracts/use-case.contract';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { Injectable } from '@nestjs/common';
import { ResourceNotFoundException } from '../../exceptions/resource-not-found-exception';

@Injectable()
export class GetUseByIdUseCase implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserId): Promise<User> {
    const user = await this.userRepository.getUserById(input.Id);
    if (!user) {
      throw new ResourceNotFoundException('User', input.Id);
    }
    return user;
  }
}
