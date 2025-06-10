import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequest {
  @ApiProperty({
    description:
      'Primeiro nome do usuário. Deve conter apenas letras e ter pelo menos 1 caractere.',
    example: 'João',
    minLength: 1,
    maxLength: 50,
  })
  firstName: string;

  @ApiProperty({
    description:
      'Sobrenome do usuário. Deve conter apenas letras e ter pelo menos 1 caractere.',
    example: 'Silva',
    minLength: 1,
    maxLength: 50,
  })
  lastName: string;

  @ApiProperty({
    description:
      'Endereço de email do usuário. Deve ser único no sistema e ter formato válido.',
    example: 'joao.silva@email.com',
    format: 'email',
    maxLength: 255,
  })
  email: string;

  @ApiProperty({
    description:
      'Senha do usuário. Deve ter pelo menos 6 caracteres para garantir segurança mínima.',
    example: 'senhaSegura123',
    minLength: 6,
    maxLength: 100,
    format: 'password',
  })
  password: string;
}
