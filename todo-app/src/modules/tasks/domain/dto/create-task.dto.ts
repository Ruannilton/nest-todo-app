import { TaskDescription } from '../value-objects/task-description';
import { TaskTitle } from '../value-objects/task-title';
import { UserId } from '../value-objects/user-id';

export class CreateTaskDto {
  title: TaskTitle;
  description: TaskDescription;
  userId: UserId;
}
