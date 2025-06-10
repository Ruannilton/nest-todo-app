import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequest {
  @ApiProperty({
    description: 'Novo primeiro nome do usuário',
    example: 'João Carlos',
    required: false,
    minLength: 1,
    maxLength: 50,
  })
  firstName?: string;

  @ApiProperty({
    description: 'Novo sobrenome do usuário',
    example: 'Santos Silva',
    required: false,
    minLength: 1,
    maxLength: 50,
  })
  secondName?: string;
}
