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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateTaskUseCase } from '../../application/use-cases/tasks/create-task.use-case';
import { UpdateTaskUseCase } from '../../application/use-cases/tasks/update-task.use-case';
import { CompleteTaskUseCase } from '../../application/use-cases/tasks/complete-task.use-case';
import { UncompleteTaskUseCase } from '../../application/use-cases/tasks/uncomplete-task.use-case';
import { DeleteTaskUseCase } from '../../application/use-cases/tasks/delete-task.use-case';
import { CreateTaskRequest } from './dto/create-task.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { TaskResponseDto, ListTasksResponseDto } from './dto/task-response.dto';
import {
  Task,
} from '../../domain/entities/task.entity';
import { TaskDescription } from '../../domain/value-objects/task-description';
import { TaskTitle } from '../../domain/value-objects/task-title';
import { TaskId } from '../../domain/value-objects/task-id';
import { UserId } from "../../domain/value-objects/user-id";
import { CreateTaskDto } from '../../domain/dto/create-task.dto';
import { UpdateTaskDto } from '../../domain/dto/update-task.dto';
import { ListTasksRequest } from './dto/list-tasks.dto';
import { ListTasksUseCase } from '../../application/use-cases/tasks/list-tasks.use-case';
import { ListTasksDto } from '../../domain/dto/list-tasks.dto';
import {
  ValidationErrorResponseDto,
  NotFoundErrorResponseDto,
} from '../common/dto/error-response.dto';
import { JwtAuthGuard } from 'src/modules/auth/service/jwt-guard.guard';
import { CurrentUser } from 'src/modules/auth/service/current-user.decorator';
import { CurrentUserDto } from 'src/modules/auth/domain/dtos/current-user.dto';
import {
  CreateTaskExamplesDto,
  CreateTaskResponseExamplesDto,
  UpdateTaskExamplesDto,
  UpdateTaskResponseExamplesDto,
  ListTasksResponseExamplesDto,
  DeleteTaskResponseExamplesDto,
} from './dto/task-examples.dto';

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
  @ApiOperation({
    summary: 'Criar nova tarefa',
    description: 'Cria uma nova tarefa associada ao usuário autenticado.',
  })
  @ApiBody({
    type: CreateTaskRequest,
    examples: {
      tarefa_completa: CreateTaskExamplesDto.TAREFA_COMPLETA,
      tarefa_simples: CreateTaskExamplesDto.TAREFA_SIMPLES,
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    type: TaskResponseDto,
    examples: {
      tarefa_criada: CreateTaskResponseExamplesDto.SUCESSO,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    type: ValidationErrorResponseDto,
    examples: {
      dados_invalidos: CreateTaskResponseExamplesDto.ERRO_VALIDACAO,
    },
  })
  async createTask(
    @CurrentUser() user: CurrentUserDto,
    @Body() request: CreateTaskRequest,
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
  @ApiOperation({
    summary: 'Listar tarefas do usuário',
    description:
      'Retorna uma lista paginada de tarefas do usuário autenticado com opções de filtro.',
  })
  @ApiQuery({
    name: 'title',
    description: 'Filtrar tarefas por título',
    required: false,
  })
  @ApiQuery({
    name: 'completed',
    description: 'Filtrar por status de conclusão',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'createdFrom',
    description: 'Data inicial para filtro (YYYY-MM-DD)',
    required: false,
  })
  @ApiQuery({
    name: 'createdTo',
    description: 'Data final para filtro (YYYY-MM-DD)',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    description: 'Número da página',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Itens por página (máx: 100)',
    type: Number,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarefas retornada com sucesso',
    type: ListTasksResponseDto,
    examples: {
      lista_tarefas: ListTasksResponseExamplesDto.LISTA_TAREFAS,
    },
  })
  async listTasks(
    @CurrentUser() user: CurrentUserDto,
    @Query() query: ListTasksRequest,
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
  @ApiOperation({
    summary: 'Atualizar tarefa',
    description: 'Atualiza parcialmente os dados de uma tarefa existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da tarefa',
    format: 'uuid',
  })
  @ApiBody({
    type: UpdateTaskRequest,
    examples: {
      atualizar_titulo: UpdateTaskExamplesDto.ATUALIZAR_TITULO,
      atualizar_completo: UpdateTaskExamplesDto.ATUALIZAR_COMPLETO,
    },
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa atualizada com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    type: ValidationErrorResponseDto,
    examples: {
      titulo_invalido: UpdateTaskResponseExamplesDto.ERRO_VALIDACAO,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundErrorResponseDto,
    examples: {
      tarefa_nao_encontrada: UpdateTaskResponseExamplesDto.ERRO_NAO_ENCONTRADA,
    },
  })
  async updateTask(
    @Param('id') id: string,
    @Body() request: UpdateTaskRequest,
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
  @ApiOperation({
    summary: 'Marcar tarefa como concluída',
    description: 'Marca uma tarefa específica como concluída.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da tarefa',
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa marcada como concluída',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundErrorResponseDto,
  })
  async completeTask(@Param('id') id: string): Promise<void> {
    const taskId = TaskId.create(id);
    await this.completeTaskUseCase.execute(taskId);
  }

  @Patch(':id/uncomplete')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Marcar tarefa como não concluída',
    description: 'Marca uma tarefa específica como não concluída.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da tarefa',
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa marcada como não concluída',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundErrorResponseDto,
  })
  async uncompleteTask(@Param('id') id: string): Promise<void> {
    const taskId = TaskId.create(id);
    await this.uncompleteTaskUseCase.execute(taskId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Excluir tarefa',
    description: 'Remove permanentemente uma tarefa do sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único da tarefa',
    format: 'uuid',
  })
  @ApiResponse({
    status: 204,
    description: 'Tarefa excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: NotFoundErrorResponseDto,
    examples: {
      tarefa_nao_encontrada:
        DeleteTaskResponseExamplesDto.TAREFA_NAO_ENCONTRADA,
    },
  })
  async deleteTask(@Param('id') id: string): Promise<void> {
    const taskId = TaskId.create(id);
    await this.deleteTaskUseCase.execute(taskId);
  }
}
