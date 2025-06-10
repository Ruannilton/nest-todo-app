import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import { UserId } from '../../../domain/value-objects/user-id';
import { IUserRepository } from '../../contracts/user-repository.contract';

@Injectable()
export class DeleteUserUseCase implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserId): Promise<void> {
    const user = await this.userRepository.getUserById(input.Id);
    if (!user) {
      throw new Error(`User with id ${input.Id} not found`);
    }
    await this.userRepository.deleteUser(input.Id);
  }
}
