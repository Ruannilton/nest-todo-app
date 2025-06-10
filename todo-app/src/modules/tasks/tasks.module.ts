import { Module } from '@nestjs/common';
import { UsersController } from './presentation/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTable } from './infrastructure/database/schemas/user-table.table';
import { CreateUserUseCase } from './application/use-cases/users/create-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/users/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/users/delete-user.use-case';
import { GetUseByIdUseCase } from './application/use-cases/users/get-user-by-id.use-case';
import { UserRepository } from './infrastructure/database/repositories/user-repository.repository';
import { IUserRepository } from './application/contracts/user-repository.contract';
import { TaskTable } from './infrastructure/database/schemas/task-table.table';
import { TasksController } from './presentation/tasks/tasks.controller';
import { CreateTaskUseCase } from './application/use-cases/tasks/create-task.use-case';
import { UpdateTaskUseCase } from './application/use-cases/tasks/update-task.use-case';
import { CompleteTaskUseCase } from './application/use-cases/tasks/complete-task.use-case';
import { UncompleteTaskUseCase } from './application/use-cases/tasks/uncomplete-task.use-case';
import { DeleteTaskUseCase } from './application/use-cases/tasks/delete-task.use-case';
import { TaskRepository } from './infrastructure/database/repositories/task-repository.repository';
import { ITaskRepository } from './application/contracts/task-repository.contract';
import { ListTasksUseCase } from './application/use-cases/tasks/list-tasks.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserTable, TaskTable])],
  controllers: [UsersController, TasksController],
  providers: [
    // User use cases
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUseByIdUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    // Task use cases
    CreateTaskUseCase,
    UpdateTaskUseCase,
    CompleteTaskUseCase,
    UncompleteTaskUseCase,
    DeleteTaskUseCase,
    ListTasksUseCase,
    {
      provide: ITaskRepository,
      useClass: TaskRepository,
    },
  ],
  exports: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class TasksModule {}
