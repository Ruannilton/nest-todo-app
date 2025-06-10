import { ApiProperty } from '@nestjs/swagger';

export class SignInRequest {
  @ApiProperty({
    description: 'Email do usuário para autenticação',
    example: 'joao.silva@email.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário para autenticação',
    example: 'senhaSegura123',
    minLength: 6,
    format: 'password',
  })
  password: string;
}
