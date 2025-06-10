import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/tasks/domain/entities/task.entity';

export class TaskResponseDto {
  @ApiProperty({
    description:
      'Identificador único da tarefa no formato UUID v4. Gerado automaticamente pelo sistema.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description:
      'Título descritivo da tarefa conforme definido na criação ou última atualização.',
    example: 'Implementar autenticação JWT',
    minLength: 3,
    maxLength: 200,
  })
  title: string;

  @ApiProperty({
    description:
      'Descrição detalhada da tarefa com contexto adicional. Pode ser null se não foi fornecida.',
    example:
      'Criar middleware de autenticação usando JWT tokens para proteger as rotas da API',
    required: false,
    maxLength: 1000,
  })
  description: string;

  @ApiProperty({
    description: 'Identificador único do usuário responsável pela tarefa.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  userId: string;

  @ApiProperty({
    description:
      'Status de conclusão da tarefa. True indica que a tarefa foi finalizada.',
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    description: 'Data e hora de criação da tarefa no formato ISO 8601.',
    example: '2024-01-15T10:30:00Z',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description:
      'Data da última atualização da tarefa no formato ISO 8601. Null se nunca foi atualizada.',
    example: '2024-01-16T14:20:00Z',
    format: 'date-time',
    required: false,
  })
  updatedAt: Date | null;

  @ApiProperty({
    description:
      'Data e hora de conclusão da tarefa no formato ISO 8601. Null se ainda não foi concluída.',
    example: '2024-01-16T16:45:00Z',
    format: 'date-time',
    required: false,
  })
  completedAt: Date | null;
}

export class ListTasksResponseDto {
  @ApiProperty({
    description:
      'Array contendo as tarefas que correspondem aos critérios de filtro especificados.',
    type: [TaskResponseDto],
    isArray: true,
  })
  tasks: TaskResponseDto[];

  @ApiProperty({
    description:
      'Número total de tarefas que correspondem aos filtros aplicados, independente da paginação.',
    example: 25,
    minimum: 0,
  })
  total: number;

  constructor(tasks: Task[], total: number) {
    this.tasks = tasks.map((task) => {
      const t = new TaskResponseDto();
      t.id = task.id.Id;
      t.title = task.title.Title;
      t.description = task.description ? task.description.Description : '';
      t.userId = task.userId.Id;
      t.completed = task.completed;
      t.createdAt = task.createdAt;
      t.updatedAt = task.updatedAt;
      t.completedAt = task.completedAt;
      return t;
    });
    this.total = total;
  }
}
