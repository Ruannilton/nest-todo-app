import { ITaskRepository } from 'src/modules/tasks/application/contracts/task-repository.contract';
import { Task } from 'src/modules/tasks/domain/entities/task.entity';
import { Repository } from 'typeorm';
import { TaskTable } from '../schemas/task-table.table';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ListTasksDto,
  ListTasksResult,
} from 'src/modules/tasks/domain/dto/list-tasks.dto';
import { DatabaseException } from '../../exceptions/database-exception';

export class TaskRepository extends ITaskRepository {
  constructor(
    @InjectRepository(TaskTable)
    private readonly taskRepository: Repository<TaskTable>,
  ) {
    super();
  }

  async createTask(task: Task): Promise<Task> {
    try {
      const taskTable = TaskTable.fromDomain(task);
      const taskAdded = await this.taskRepository.save(taskTable);
      return TaskTable.toDomain(taskAdded);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
  async getTaskById(id: string): Promise<Task | null> {
    try {
      const taskTable = await this.taskRepository.findOne({ where: { id } });
      if (!taskTable) {
        return null;
      }
      return TaskTable.toDomain(taskTable);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
  async getTasksByUserId(userId: string): Promise<Task[]> {
    try {
      const taskTables = await this.taskRepository.find({ where: { userId } });
      return taskTables.map((task) => TaskTable.toDomain(task));
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
  async updateTask(task: Task): Promise<Task> {
    try {
      const taskTable = TaskTable.fromDomain(task);
      const taskUpdated = await this.taskRepository.save(taskTable);
      return TaskTable.toDomain(taskUpdated);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }

  async listTasks(filter: ListTasksDto): Promise<ListTasksResult> {
    try {
      const { userId, title, completed, createdFrom, createdTo, page, limit } =
        filter;

      const query = this.taskRepository
        .createQueryBuilder('task')
        .where('task.userId = :userId', { userId: userId.Id });

      if (title) {
        query.andWhere('task.title ILIKE :title', { title: `%${title}%` });
      }

      if (completed !== undefined) {
        query.andWhere('task.completed = :completed', { completed });
      }

      if (createdFrom) {
        query.andWhere('task.createdAt >= :createdFrom', { createdFrom });
      }

      if (createdTo) {
        query.andWhere('task.createdAt <= :createdTo', { createdTo });
      }

      const [tasks, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        tasks: tasks.map((task) => TaskTable.toDomain(task)),
        total,
      };
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
}
