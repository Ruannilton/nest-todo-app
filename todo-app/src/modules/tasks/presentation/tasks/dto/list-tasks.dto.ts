import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/tasks/domain/entities/task.entity';

export class ListTasksRequest {
  @ApiProperty({
    description:
      'Filtrar tarefas por título usando busca parcial (case-insensitive). Útil para encontrar tarefas específicas.',
    example: 'autenticação',
    required: false,
    maxLength: 200,
  })
  title?: string;

  @ApiProperty({
    description:
      'Filtrar tarefas por status de conclusão. True mostra apenas concluídas, false apenas pendentes.',
    example: false,
    required: false,
    type: Boolean,
  })
  completed?: boolean;

  @ApiProperty({
    description:
      'Data inicial para filtrar tarefas por período de criação (formato YYYY-MM-DD).',
    example: '2024-01-01',
    format: 'date',
    required: false,
  })
  createdFrom?: Date;

  @ApiProperty({
    description:
      'Data final para filtrar tarefas por período de criação (formato YYYY-MM-DD).',
    example: '2024-12-31',
    format: 'date',
    required: false,
  })
  createdTo?: Date;

  @ApiProperty({
    description: 'Número da página para navegação paginada. Começa em 1.',
    example: 1,
    minimum: 1,
    default: 1,
    type: Number,
  })
  page: number;

  @ApiProperty({
    description:
      'Quantidade de itens por página. Máximo permitido é 100 itens.',
    example: 10,
    minimum: 1,
    maximum: 100,
    default: 10,
    type: Number,
  })
  limit: number;
}

export interface ListTasksResult {
  tasks: Task[];
  total: number;
}
