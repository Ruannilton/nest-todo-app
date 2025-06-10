import { TaskDescription } from '../value-objects/task-description';
import { TaskId } from '../value-objects/task-id';
import { TaskTitle } from '../value-objects/task-title';
import { UserId } from '../value-objects/user-id';

export class Task {
  id: TaskId;
  title: TaskTitle;
  description: TaskDescription;
  userId: UserId;
  completed: boolean;

  createdAt: Date;
  updatedAt: Date | null = null;
  completedAt: Date | null = null;

  constructor(
    id: TaskId,
    userId: UserId,
    title: TaskTitle,
    description: TaskDescription,
    completed: boolean = false,
    createdAt: Date = new Date(),
    updatedAt: Date | null = null,
    completedAt: Date | null = null,
  ) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.completed = completed;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.completedAt = completedAt;
  }

  static create(
    userId: UserId,
    title: TaskTitle,
    description: TaskDescription,
  ): Task {
    return new Task(TaskId.empty(), userId, title, description);
  }

  markAsCompleted(): void {
    this.completed = true;
    this.completedAt = new Date();
    this.updatedAt = new Date();
  }

  markAsIncomplete(): void {
    this.completed = false;
    this.completedAt = null;
    this.updatedAt = new Date();
  }

  updateTitle(title: TaskTitle): void {
    this.title = title;
    this.updatedAt = new Date();
  }

  updateDescription(description: TaskDescription): void {
    this.description = description;
    this.updatedAt = new Date();
  }
}
