import { PartialType } from '@nestjs/mapped-types';
import { TaskDescription } from '../value-objects/task-description';
import { TaskTitle } from '../value-objects/task-title';
import { TaskId } from '../value-objects/task-id';

class _UpdateTaskDto {
  title: TaskTitle;
  description: TaskDescription;
}

export class UpdateTaskDto extends PartialType(_UpdateTaskDto) {
  id: TaskId;
}
