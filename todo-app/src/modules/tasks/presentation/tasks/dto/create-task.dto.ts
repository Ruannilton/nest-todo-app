import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequest {
  @ApiProperty({
    description: 'Título da tarefa (mínimo 3 caracteres)',
    example: 'Implementar autenticação JWT',
    minLength: 3,
    maxLength: 200,
  })
  title: string;

  @ApiProperty({
    description: 'Descrição detalhada da tarefa (opcional)',
    example:
      'Criar middleware de autenticação usando JWT tokens para proteger as rotas da API',
    required: false,
    maxLength: 1000,
  })
  description: string | null;
}
