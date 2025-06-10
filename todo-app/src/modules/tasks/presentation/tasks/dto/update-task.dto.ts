import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskRequest {
  @ApiProperty({
    description: 'Novo título da tarefa (mínimo 3 caracteres)',
    example: 'Implementar autenticação JWT com refresh tokens',
    minLength: 3,
    maxLength: 200,
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Nova descrição da tarefa (opcional)',
    example:
      'Implementar sistema completo de autenticação com JWT access tokens e refresh tokens para maior segurança',
    required: false,
    maxLength: 1000,
  })
  description?: string;
}
