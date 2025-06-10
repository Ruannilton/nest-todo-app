import { Task } from '../entities/task.entity';
import { UserId } from "../value-objects/user-id";

export interface ListTasksDto {
  userId: UserId;
  title?: string;
  completed?: boolean;
  createdFrom?: Date;
  createdTo?: Date;
  page: number;
  limit: number;
}

export interface ListTasksResult {
  tasks: Task[];
  total: number;
}
