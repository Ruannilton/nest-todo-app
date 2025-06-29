import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import { UpdateTaskDto } from '../../../domain/dto/update-task.dto';
import { ITaskRepository } from '../../contracts/task-repository.contract';

@Injectable()
export class UpdateTaskUseCase implements UseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}
  async execute(input: UpdateTaskDto): Promise<void> {
    const task = await this.taskRepository.getTaskById(input.id.Id);
    if (!task) {
      throw new Error('Task not found');
    }
    if (input.title) task.updateTitle(input.title);
    if (input.description) task.updateDescription(input.description);
    await this.taskRepository.updateTask(task);
  }
}
