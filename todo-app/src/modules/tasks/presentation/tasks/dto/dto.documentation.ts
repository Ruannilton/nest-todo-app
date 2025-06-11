const TASK_TITLE_PROPERTY = {
  description: 'Título da tarefa',
  example: 'Implementar autenticação JWT',
  minLength: 3,
  maxLength: 200,
};

const TASK_DESCRIPTION_PROPERTY = {
  description: 'Descrição detalhada da tarefa',
  example:
    'Criar middleware de autenticação usando JWT tokens para proteger as rotas da API',
  required: false,
  minLength: 5,
  maxLength: 1000,
};

const TASK_TITLE_UPDATE_PROPERTY = {
  description: 'Novo título da tarefa',
  example: 'Implementar autenticação JWT com refresh tokens',
  minLength: 3,
  maxLength: 200,
  required: false,
};

const TASK_DESCRIPTION_UPDATE_PROPERTY = {
  description: 'Nova descrição da tarefa',
  example:
    'Implementar sistema completo de autenticação com JWT access tokens e refresh tokens para maior segurança',
  required: false,
  minLength: 5,
  maxLength: 1000,
};

const TASK_FILTER_TITLE_PROPERTY = {
  description:
    'Filtrar tarefas por título usando busca parcial (case-insensitive). Útil para encontrar tarefas específicas.',
  example: 'autenticação',
  required: false,
  maxLength: 200,
};

const TASK_FILTER_COMPLETED_PROPERTY = {
  description:
    'Filtrar tarefas por status de conclusão. True mostra apenas concluídas, false apenas pendentes.',
  example: false,
  required: false,
  type: Boolean,
};

const TASK_FILTER_CREATED_FROM_PROPERTY = {
  description:
    'Data inicial para filtrar tarefas por período de criação (formato YYYY-MM-DD).',
  example: '2024-01-01',
  format: 'date',
  required: false,
};

const TASK_FILTER_CREATED_TO_PROPERTY = {
  description:
    'Data final para filtrar tarefas por período de criação (formato YYYY-MM-DD).',
  example: '2024-12-31',
  format: 'date',
  required: false,
};

const PAGINATION_PAGE_PROPERTY = {
  description: 'Número da página para navegação paginada. Começa em 1.',
  example: 1,
  minimum: 1,
  default: 1,
  type: Number,
};

const PAGINATION_LIMIT_PROPERTY = {
  description: 'Quantidade de itens por página. Máximo permitido é 100 itens.',
  example: 10,
  minimum: 1,
  maximum: 100,
  default: 10,
  type: Number,
};

export {
  TASK_TITLE_PROPERTY,
  TASK_DESCRIPTION_PROPERTY,
  TASK_TITLE_UPDATE_PROPERTY,
  TASK_DESCRIPTION_UPDATE_PROPERTY,
  TASK_FILTER_TITLE_PROPERTY,
  TASK_FILTER_COMPLETED_PROPERTY,
  TASK_FILTER_CREATED_FROM_PROPERTY,
  TASK_FILTER_CREATED_TO_PROPERTY,
  PAGINATION_PAGE_PROPERTY,
  PAGINATION_LIMIT_PROPERTY,
};
