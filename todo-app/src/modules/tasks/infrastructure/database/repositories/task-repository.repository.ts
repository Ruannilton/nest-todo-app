import { ITaskRepository } from 'src/modules/tasks/application/contracts/task-repository.contract';
import { Task } from 'src/modules/tasks/domain/entities/task.entity';
import { Repository } from 'typeorm';
import { TaskTable } from '../schemas/task-table.table';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ListTasksDto,
  ListTasksResult,
} from 'src/modules/tasks/domain/dto/list-tasks.dto';

export class TaskRepository extends ITaskRepository {
  constructor(
    @InjectRepository(TaskTable)
    private readonly taskRepository: Repository<TaskTable>,
  ) {
    super();
  }

  async createTask(task: Task): Promise<Task> {
    const taskTable = TaskTable.fromDomain(task);
    const taskAdded = await this.taskRepository.save(taskTable);
    return TaskTable.toDomain(taskAdded);
  }
  async getTaskById(id: string): Promise<Task | null> {
    const taskTable = await this.taskRepository.findOne({ where: { id } });
    if (!taskTable) {
      return null;
    }
    return TaskTable.toDomain(taskTable);
  }
  async getTasksByUserId(userId: string): Promise<Task[]> {
    const taskTables = await this.taskRepository.find({ where: { userId } });
    return taskTables.map((task) => TaskTable.toDomain(task));
  }
  async updateTask(task: Task): Promise<Task> {
    const taskTable = TaskTable.fromDomain(task);
    const taskUpdated = await this.taskRepository.save(taskTable);
    return TaskTable.toDomain(taskUpdated);
  }
  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async listTasks(filter: ListTasksDto): Promise<ListTasksResult> {
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
  }
}
