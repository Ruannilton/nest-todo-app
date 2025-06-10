import { ApiProperty } from '@nestjs/swagger';

export class SignUpRequest {
  @ApiProperty({
    description: 'Email único do usuário',
    example: 'joao.silva@email.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senhaSegura123',
    minLength: 6,
    format: 'password',
  })
  password: string;

  @ApiProperty({
    description: 'Primeiro nome do usuário',
    example: 'João',
    minLength: 1,
    maxLength: 50,
  })
  firstName: string;

  @ApiProperty({
    description: 'Sobrenome do usuário',
    example: 'Silva',
    minLength: 1,
    maxLength: 50,
  })
  lastName: string;
}
