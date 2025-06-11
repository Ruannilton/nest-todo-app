import { UseCase as IUseCase } from 'src/core/contracts/use-case.contract';
import { ITaskRepository } from '../../contracts/task-repository.contract';
import { Injectable } from '@nestjs/common';
import { Task } from '../../../domain/entities/task.entity';
import { CreateTaskDto } from '../../../domain/dto/create-task.dto';

@Injectable()
export class CreateTaskUseCase implements IUseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}
  async execute(input: CreateTaskDto): Promise<Task> {
    const newTask = Task.create(input.userId, input.title, input.description);
    const createdTask = await this.taskRepository.createTask(newTask);
    return createdTask;
  }
}
