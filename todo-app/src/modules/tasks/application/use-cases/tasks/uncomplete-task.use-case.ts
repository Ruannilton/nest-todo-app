import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import { TaskId } from 'src/modules/tasks/domain/value-objects/task-id';
import { ITaskRepository } from '../../contracts/task-repository.contract';

@Injectable()
export class UncompleteTaskUseCase implements UseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}
  async execute(input: TaskId): Promise<void> {
    const task = await this.taskRepository.getTaskById(input.Id);
    if (!task) {
      throw new Error('Task not found');
    }

    task.markAsIncomplete();

    const updatedTask = await this.taskRepository.updateTask(task);
    if (!updatedTask) {
      throw new Error('Task completion failed');
    }
  }
}
