import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Dados de entrada inválidos',
  })
  message: string;

  @ApiProperty({
    description: 'Detalhes adicionais sobre o erro',
    example: 'Email já está em uso',
    required: false,
  })
  error?: string;
}

export class ValidationErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Lista de mensagens de erro de validação',
    example: [
      'Email deve ser um endereço válido',
      'Senha deve ter pelo menos 6 caracteres',
    ],
    isArray: true,
  })
  message: string[];

  @ApiProperty({
    description: 'Tipo do erro',
    example: 'Bad Request',
  })
  error: string;
}

export class NotFoundErrorResponseDto {
  @ApiProperty({
    description: 'Código de status HTTP',
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Mensagem de erro',
    example: 'Recurso não encontrado',
  })
  message: string;

  @ApiProperty({
    description: 'Tipo do erro',
    example: 'Not Found',
  })
  error: string;
}
