import {
  Task,
} from 'src/modules/tasks/domain/entities/task.entity';
import { TaskDescription } from 'src/modules/tasks/domain/value-objects/task-description';
import { TaskTitle } from 'src/modules/tasks/domain/value-objects/task-title';
import { TaskId } from 'src/modules/tasks/domain/value-objects/task-id';
import { UserId } from "src/modules/tasks/domain/value-objects/user-id";
import { UserTable } from 'src/modules/tasks/infrastructure/database/schemas/user-table.table';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserTable, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserTable;

  @Column({ default: false })
  completed: boolean;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null = null;

  static fromDomain(task: Task): TaskTable {
    const taskTable = new TaskTable();
    // Only set ID if it's not empty (for updates)
    if (task.id.Id && task.id.Id !== '') {
      taskTable.id = task.id.Id;
    }
    taskTable.title = task.title.Title;
    taskTable.description = task.description.Description;
    taskTable.userId = task.userId.Id;
    taskTable.completed = task.completed;
    taskTable.createdAt = task.createdAt;
    taskTable.updatedAt = task.updatedAt;
    taskTable.completedAt = task.completedAt;
    return taskTable;
  }
  static toDomain(taskTable: TaskTable): Task {
    return new Task(
      TaskId.create(taskTable.id),
      UserId.create(taskTable.userId),
      TaskTitle.create(taskTable.title),
      TaskDescription.create(taskTable.description),
      taskTable.completed,
      taskTable.createdAt,
      taskTable.updatedAt,
      taskTable.completedAt,
    );
  }
}
