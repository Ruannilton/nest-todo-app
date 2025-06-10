import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    description:
      'Identificador único do usuário no formato UUID v4. Gerado automaticamente pelo sistema.',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    description: 'Primeiro nome do usuário conforme fornecido no cadastro.',
    example: 'João',
    minLength: 1,
    maxLength: 50,
  })
  firstName: string;

  @ApiProperty({
    description: 'Sobrenome do usuário conforme fornecido no cadastro.',
    example: 'Silva',
    minLength: 1,
    maxLength: 50,
  })
  lastName: string;

  @ApiProperty({
    description:
      'Endereço de email único do usuário. Usado para login e comunicações.',
    example: 'joao.silva@email.com',
    format: 'email',
    maxLength: 255,
  })
  email: string;
}
