import {
  ValidationErrorResponseDto,
  NotFoundErrorResponseDto,
} from '../common/dto/error-response.dto';
import {
  CreateTaskExamplesDto,
  CreateTaskResponseExamplesDto,
  UpdateTaskExamplesDto,
  UpdateTaskResponseExamplesDto,
  ListTasksResponseExamplesDto,
  DeleteTaskResponseExamplesDto,
} from './dto/task-examples.dto';
import { CreateTaskRequest } from './dto/create-task.dto';
import { UpdateTaskRequest } from './dto/update-task.dto';
import { TaskResponseDto, ListTasksResponseDto } from './dto/task-response.dto';

// CREATE TASK
const CREATE_TASK_OPERATION = {
  summary: 'Criar nova tarefa',
  description: 'Cria uma nova tarefa associada ao usuário autenticado.',
};

const CREATE_TASK_BODY = {
  type: CreateTaskRequest,
  examples: {
    tarefa_completa: CreateTaskExamplesDto.TAREFA_COMPLETA,
    tarefa_simples: CreateTaskExamplesDto.TAREFA_SIMPLES,
  },
};

const CREATE_TASK_RESPONSE_201 = {
  status: 201,
  description: 'Tarefa criada com sucesso',
  type: TaskResponseDto,
  examples: {
    sucesso: CreateTaskResponseExamplesDto.SUCESSO,
  },
};

const CREATE_TASK_RESPONSE_400 = {
  status: 400,
  description: 'Dados de entrada inválidos',
  type: ValidationErrorResponseDto,
  examples: {
    validacao: CreateTaskResponseExamplesDto.ERRO_VALIDACAO,
  },
};

// LIST TASKS
const LIST_TASKS_OPERATION = {
  summary: 'Listar tarefas do usuário',
  description:
    'Retorna uma lista paginada de tarefas do usuário autenticado com opções de filtro.',
};

const LIST_TASKS_RESPONSE_200 = {
  status: 200,
  description: 'Lista de tarefas retornada com sucesso',
  type: ListTasksResponseDto,
  examples: {
    sucesso: ListTasksResponseExamplesDto.LISTA_TAREFAS,
  },
};

// UPDATE TASK
const UPDATE_TASK_OPERATION = {
  summary: 'Atualizar tarefa',
  description: 'Atualiza parcialmente os dados de uma tarefa existente.',
};

const UPDATE_TASK_BODY = {
  type: UpdateTaskRequest,
  examples: {
    atualizar_titulo: UpdateTaskExamplesDto.ATUALIZAR_TITULO,
    atualizar_completo: UpdateTaskExamplesDto.ATUALIZAR_COMPLETO,
  },
};

const UPDATE_TASK_RESPONSE_204 = {
  status: 204,
  description: 'Tarefa atualizada com sucesso',
};

const UPDATE_TASK_RESPONSE_400 = {
  status: 400,
  description: 'Dados de entrada inválidos',
  type: ValidationErrorResponseDto,
  examples: {
    validacao: UpdateTaskResponseExamplesDto.ERRO_VALIDACAO,
  },
};

const UPDATE_TASK_RESPONSE_404 = {
  status: 404,
  description: 'Tarefa não encontrada',
  type: NotFoundErrorResponseDto,
  examples: {
    nao_encontrada: UpdateTaskResponseExamplesDto.ERRO_NAO_ENCONTRADA,
  },
};

// COMPLETE TASK
const COMPLETE_TASK_OPERATION = {
  summary: 'Marcar tarefa como concluída',
  description: 'Marca uma tarefa específica como concluída.',
};

const COMPLETE_TASK_RESPONSE_204 = {
  status: 204,
  description: 'Tarefa marcada como concluída',
};

const COMPLETE_TASK_RESPONSE_404 = {
  status: 404,
  description: 'Tarefa não encontrada',
  type: NotFoundErrorResponseDto,
};

// UNCOMPLETE TASK
const UNCOMPLETE_TASK_OPERATION = {
  summary: 'Marcar tarefa como não concluída',
  description: 'Marca uma tarefa específica como não concluída.',
};

const UNCOMPLETE_TASK_RESPONSE_204 = {
  status: 204,
  description: 'Tarefa marcada como não concluída',
};

const UNCOMPLETE_TASK_RESPONSE_404 = {
  status: 404,
  description: 'Tarefa não encontrada',
  type: NotFoundErrorResponseDto,
};

// DELETE TASK
const DELETE_TASK_OPERATION = {
  summary: 'Excluir tarefa',
  description: 'Remove permanentemente uma tarefa do sistema.',
};

const DELETE_TASK_RESPONSE_204 = {
  status: 204,
  description: 'Tarefa excluída com sucesso',
};

const DELETE_TASK_RESPONSE_404 = {
  status: 404,
  description: 'Tarefa não encontrada',
  type: NotFoundErrorResponseDto,
  examples: {
    nao_encontrada: DeleteTaskResponseExamplesDto.TAREFA_NAO_ENCONTRADA,
  },
};

// SHARED PARAMS
const TASK_ID_PARAM = {
  name: 'id',
  description: 'ID único da tarefa no formato UUID',
  format: 'uuid',
};

export {
  // Create
  CREATE_TASK_OPERATION,
  CREATE_TASK_BODY,
  CREATE_TASK_RESPONSE_201,
  CREATE_TASK_RESPONSE_400,

  // List
  LIST_TASKS_OPERATION,
  LIST_TASKS_RESPONSE_200,

  // Update
  UPDATE_TASK_OPERATION,
  UPDATE_TASK_BODY,
  UPDATE_TASK_RESPONSE_204,
  UPDATE_TASK_RESPONSE_400,
  UPDATE_TASK_RESPONSE_404,

  // Complete
  COMPLETE_TASK_OPERATION,
  COMPLETE_TASK_RESPONSE_204,
  COMPLETE_TASK_RESPONSE_404,

  // Uncomplete
  UNCOMPLETE_TASK_OPERATION,
  UNCOMPLETE_TASK_RESPONSE_204,
  UNCOMPLETE_TASK_RESPONSE_404,

  // Delete
  DELETE_TASK_OPERATION,
  DELETE_TASK_RESPONSE_204,
  DELETE_TASK_RESPONSE_404,

  // Shared
  TASK_ID_PARAM,
};
