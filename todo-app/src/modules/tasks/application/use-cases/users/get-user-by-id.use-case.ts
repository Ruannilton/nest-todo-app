import { UseCase } from 'src/core/contracts/use-case.contract';
import { User } from '../../../domain/entities/user.entity';
import { UserId } from '../../../domain/value-objects/user-id';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUseByIdUseCase implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserId): Promise<User> {
    const user = await this.userRepository.getUserById(input.Id);
    if (!user) {
      throw new Error(`User with id ${input.Id} not found`);
    }
    return user;
  }
}
