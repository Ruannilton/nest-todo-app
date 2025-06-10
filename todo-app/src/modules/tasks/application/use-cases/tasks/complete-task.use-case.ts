import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import { TaskId } from 'src/modules/tasks/domain/value-objects/task-id';
import { ITaskRepository } from '../../contracts/task-repository.contract';

@Injectable()
export class CompleteTaskUseCase implements UseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}
  async execute(input: TaskId): Promise<void> {
    const task = await this.taskRepository.getTaskById(input.Id);
    if (!task) {
      throw new Error('Task not found');
    }

    task.markAsCompleted();

    await this.taskRepository.updateTask(task);
  }
}
