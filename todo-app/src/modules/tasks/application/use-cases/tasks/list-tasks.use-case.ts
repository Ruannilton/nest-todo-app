import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/contracts/use-case.contract';
import {
  ListTasksDto,
  ListTasksResult,
} from '../../../domain/dto/list-tasks.dto';
import { ITaskRepository } from '../../contracts/task-repository.contract';

@Injectable()
export class ListTasksUseCase implements UseCase {
  constructor(private readonly taskRepository: ITaskRepository) {}
  async execute(input: ListTasksDto): Promise<ListTasksResult> {
    const response = await this.taskRepository.listTasks(input);
    return response;
  }
}
