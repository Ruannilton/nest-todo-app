import { ListTasksDto, ListTasksResult } from '../../domain/dto/list-tasks.dto';
import { Task } from '../../domain/entities/task.entity';

export abstract class ITaskRepository {
  abstract listTasks(filer: ListTasksDto): Promise<ListTasksResult>;
  abstract createTask(task: Task): Promise<Task>;
  abstract getTaskById(id: string): Promise<Task | null>;
  abstract getTasksByUserId(userId: string): Promise<Task[]>;
  abstract updateTask(task: Task): Promise<Task>;
  abstract deleteTask(id: string): Promise<void>;
}
