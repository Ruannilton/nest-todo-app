import {
  Controller,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateTaskUseCase } from '../../application/use-cases/tasks/create-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/tasks/update-task.use-case';
import { CompleteTaskUseCase } from '../../application/use-cases/tasks/complete-task.use-case';
import { UncompleteTaskUseCase } from '../../application/use-cases/tasks/uncomplete-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/tasks/delete-task.use-case';
import { CreateTaskRequest } from './dto/create-task.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { ListTasksResponseDto } from './dto/task-response.dto';
import { Task } from '../../domain/entities/task.entity';
import { TaskDescription } from '../../domain/value-objects/task-description';
import { TaskTitle } from '../../domain/value-objects/task-title';
import { TaskId } from '../../domain/value-objects/task-id';
import { UserId } from '../../domain/value-objects/user-id';
import { CreateTaskDto } from '../../domain/dto/create-task.dto';
import { UpdateTaskDto } from '../../domain/dto/update-task.dto';
import { ListTasksRequest } from './dto/list-tasks.dto';
import { ListTasksUseCase } from '../../application/use-cases/tasks/list-tasks.use-case';
import { ListTasksDto } from '../../domain/dto/list-tasks.dto';
import { JwtAuthGuard } from '../../../../modules/auth/service/jwt-guard.guard';
import { CurrentUser } from '../../../../modules/auth/service/current-user.decorator';
import { CurrentUserDto } from '../../../../modules/auth/domain/dtos/current-user.dto';
import * as TasksDoc from './tasks.documentation';

@ApiTags('Tarefas')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly completeTaskUseCase: CompleteTaskUseCase,
    private readonly uncompleteTaskUseCase: UncompleteTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly listTasksUseCase: ListTasksUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(TasksDoc.CREATE_TASK_OPERATION)
  @ApiBody(TasksDoc.CREATE_TASK_BODY)
  @ApiResponse(TasksDoc.CREATE_TASK_RESPONSE_201)
  @ApiResponse(TasksDoc.CREATE_TASK_RESPONSE_400)
  async createTask(
    @CurrentUser() user: CurrentUserDto,
    @Body(new ValidationPipe()) request: CreateTaskRequest,
  ): Promise<Task> {
    const createTaskDto: CreateTaskDto = {
      userId: UserId.create(user.userId),
      title: TaskTitle.create(request.title),
      description: TaskDescription.create(request.description),
    };

    return await this.createTaskUseCase.execute(createTaskDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation(TasksDoc.LIST_TASKS_OPERATION)
  @ApiResponse(TasksDoc.LIST_TASKS_RESPONSE_200)
  async listTasks(
    @CurrentUser() user: CurrentUserDto,
    @Query(new ValidationPipe({ transform: true })) query: ListTasksRequest,
  ): Promise<ListTasksResponseDto> {
    const listTasksDto: ListTasksDto = {
      userId: UserId.create(user.userId),
      title: query.title,
      completed: query.completed,
      createdFrom: query.createdFrom ? new Date(query.createdFrom) : undefined,
      createdTo: query.createdTo ? new Date(query.createdTo) : undefined,
      page: query.page || 1,
      limit: query.limit || 10,
    };
    const { tasks, total } = await this.listTasksUseCase.execute(listTasksDto);
    const response = new ListTasksResponseDto(tasks, total);
    return response;
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @ApiOperation(TasksDoc.UPDATE_TASK_OPERATION)
  @ApiParam(TasksDoc.TASK_ID_PARAM)
  @ApiBody(TasksDoc.UPDATE_TASK_BODY)
  @ApiResponse(TasksDoc.UPDATE_TASK_RESPONSE_204)
  @ApiResponse(TasksDoc.UPDATE_TASK_RESPONSE_400)
  @ApiResponse(TasksDoc.UPDATE_TASK_RESPONSE_404)
  async updateTask(
    @Param('id') id: string,
    @Body(new ValidationPipe()) request: UpdateTaskRequest,
  ): Promise<void> {
    const updateTaskDto: UpdateTaskDto = {
      id: TaskId.create(id),
    };

    if (request.title) {
      updateTaskDto.title = TaskTitle.create(request.title);
    }

    if (request.description) {
      updateTaskDto.description = TaskDescription.create(request.description);
    }

    await this.updateTaskUseCase.execute(updateTaskDto);
  }

  @Patch(':id/complete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(TasksDoc.COMPLETE_TASK_OPERATION)
  @ApiParam(TasksDoc.TASK_ID_PARAM)
  @ApiResponse(TasksDoc.COMPLETE_TASK_RESPONSE_204)
  @ApiResponse(TasksDoc.COMPLETE_TASK_RESPONSE_404)
  async completeTask(@Param('id') id: string): Promise<void> {
    const taskId = TaskId.create(id);
    await this.completeTaskUseCase.execute(taskId);
  }

  @Patch(':id/uncomplete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(TasksDoc.UNCOMPLETE_TASK_OPERATION)
  @ApiParam(TasksDoc.TASK_ID_PARAM)
  @ApiResponse(TasksDoc.UNCOMPLETE_TASK_RESPONSE_204)
  @ApiResponse(TasksDoc.UNCOMPLETE_TASK_RESPONSE_404)
  async uncompleteTask(@Param('id') id: string): Promise<void> {
    const taskId = TaskId.create(id);
    await this.uncompleteTaskUseCase.execute(taskId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation(TasksDoc.DELETE_TASK_OPERATION)
  @ApiParam(TasksDoc.TASK_ID_PARAM)
  @ApiResponse(TasksDoc.DELETE_TASK_RESPONSE_204)
  @ApiResponse(TasksDoc.DELETE_TASK_RESPONSE_404)
  async deleteTask(@Param('id') id: string): Promise<void> {
    const taskId = TaskId.create(id);
    await this.deleteTaskUseCase.execute(taskId);
  }
}
