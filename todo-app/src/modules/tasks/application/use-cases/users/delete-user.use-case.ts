import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import { UserId } from '../../../domain/value-objects/user-id';
import { IUserRepository } from '../../contracts/user-repository.contract';
import { ResourceNotFoundException } from '../../exceptions/resource-not-found-exception';

@Injectable()
export class DeleteUserUseCase implements UseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserId): Promise<void> {
    const user = await this.userRepository.getUserById(input.Id);
    if (!user) {
      throw new ResourceNotFoundException('User', input.Id);
    }
    await this.userRepository.deleteUser(input.Id);
  }
}
