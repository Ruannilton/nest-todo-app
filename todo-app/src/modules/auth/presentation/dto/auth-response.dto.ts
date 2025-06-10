import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  @ApiProperty({
    description:
      'Token de acesso JWT para autenticação nas próximas requisições. ' +
      'Deve ser incluído no header Authorization como "Bearer {token}". ' +
      'Válido por 1 hora.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvYW8uc2lsdmFAZW1haWwuY29tIiwic3ViIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwiaWF0IjoxNzE2MjAwMDAwLCJleHAiOjE3MTYyMDM2MDB9.ABC123def456',
  })
  accessToken: string;
}

export class SignUpResponseDto {
  @ApiProperty({
    description:
      'Token de acesso JWT para autenticação nas próximas requisições. ' +
      'Deve ser incluído no header Authorization como "Bearer {token}". ' +
      'Válido por 1 hora. Gerado automaticamente após o cadastro bem-sucedido.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvYW8uc2lsdmFAZW1haWwuY29tIiwic3ViIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwiaWF0IjoxNzE2MjAwMDAwLCJleHAiOjE3MTYyMDM2MDB9.ABC123def456',
  })
  accessToken: string;
}
