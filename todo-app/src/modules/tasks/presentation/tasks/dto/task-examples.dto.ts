// DTOs de exemplos para o módulo de tarefas - Request e Response

export class CreateTaskExamplesDto {
  static readonly TAREFA_COMPLETA = {
    summary: 'Tarefa com descrição',
    description: 'Exemplo de criação de tarefa com título e descrição',
    value: {
      title: 'Implementar autenticação JWT',
      description:
        'Criar middleware de autenticação usando JWT tokens para proteger as rotas da API',
    },
  };

  static readonly TAREFA_SIMPLES = {
    summary: 'Tarefa sem descrição',
    description: 'Exemplo de criação de tarefa apenas com título',
    value: {
      title: 'Revisar código da feature X',
    },
  };
}

export class CreateTaskResponseExamplesDto {
  static readonly SUCESSO = {
    summary: 'Tarefa criada com sucesso',
    value: {
      id: '987e4567-e89b-12d3-a456-426614174001',
      title: 'Implementar autenticação JWT',
      description:
        'Criar middleware de autenticação usando JWT tokens para proteger as rotas da API',
      userId: '123e4567-e89b-12d3-a456-426614174000',
      completed: false,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: null,
      completedAt: null,
    },
  };

  static readonly ERRO_VALIDACAO = {
    summary: 'Dados de entrada inválidos',
    value: {
      statusCode: 400,
      message: ['Título deve ter pelo menos 3 caracteres'],
      error: 'Bad Request',
    },
  };
}

export class UpdateTaskExamplesDto {
  static readonly ATUALIZAR_TITULO = {
    summary: 'Atualizar apenas título',
    value: {
      title: 'Implementar autenticação JWT com refresh tokens',
    },
  };

  static readonly ATUALIZAR_COMPLETO = {
    summary: 'Atualizar título e descrição',
    value: {
      title: 'Implementar sistema de autenticação completo',
      description:
        'Implementar autenticação JWT com access tokens, refresh tokens e middleware de autorização',
    },
  };
}

export class UpdateTaskResponseExamplesDto {
  static readonly ERRO_VALIDACAO = {
    summary: 'Título muito curto',
    value: {
      statusCode: 400,
      message: ['Título deve ter pelo menos 3 caracteres'],
      error: 'Bad Request',
    },
  };

  static readonly ERRO_NAO_ENCONTRADA = {
    summary: 'Tarefa não existe',
    value: {
      statusCode: 404,
      message: 'Tarefa não encontrada',
      error: 'Not Found',
    },
  };
}

export class ListTasksResponseExamplesDto {
  static readonly LISTA_TAREFAS = {
    summary: 'Lista de tarefas com paginação',
    value: {
      tasks: [
        {
          id: '987e4567-e89b-12d3-a456-426614174001',
          title: 'Implementar autenticação JWT',
          description: 'Criar middleware de autenticação usando JWT tokens',
          userId: '123e4567-e89b-12d3-a456-426614174000',
          completed: false,
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: null,
          completedAt: null,
        },
        {
          id: '987e4567-e89b-12d3-a456-426614174002',
          title: 'Revisar documentação',
          description: 'Atualizar documentação da API',
          userId: '123e4567-e89b-12d3-a456-426614174000',
          completed: true,
          createdAt: '2024-01-14T08:15:00Z',
          updatedAt: '2024-01-14T16:30:00Z',
          completedAt: '2024-01-14T16:30:00Z',
        },
      ],
      total: 25,
    },
  };
}

export class DeleteTaskResponseExamplesDto {
  static readonly TAREFA_NAO_ENCONTRADA = {
    summary: 'Tarefa não existe',
    value: {
      statusCode: 404,
      message: 'Tarefa não encontrada',
      error: 'Not Found',
    },
  };
}
