// DTO para documentação de exemplos de requisições
export class SignInExamplesDto {
  static readonly LOGIN_SUCESSO = {
    summary: 'Login com credenciais válidas',
    description: 'Exemplo de login com email e senha corretos',
    value: {
      email: 'joao.silva@email.com',
      password: 'senhaSegura123',
    },
  };
}

// DTO para documentação de exemplos de respostas
export class SignInResponseExamplesDto {
  static readonly SUCESSO = {
    summary: 'Login realizado com sucesso',
    value: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvYW8uc2lsdmFAZW1haWwuY29tIiwic3ViIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwiaWF0IjoxNzE2MjAwMDAwLCJleHAiOjE3MTYyMDM2MDB9.ABC123def456',
    },
  };

  static readonly ERRO_CREDENCIAIS = {
    summary: 'Credenciais inválidas',
    value: {
      statusCode: 401,
      message: 'Email ou senha incorretos',
      error: 'Unauthorized',
    },
  };

  static readonly ERRO_VALIDACAO = {
    summary: 'Dados de entrada inválidos',
    value: {
      statusCode: 400,
      message: [
        'Email deve ser um endereço válido',
        'Senha deve ter pelo menos 6 caracteres',
      ],
      error: 'Bad Request',
    },
  };
}

export class SignUpExamplesDto {
  static readonly CADASTRO_COMPLETO = {
    summary: 'Cadastro com todos os dados',
    description: 'Exemplo de cadastro com todos os campos obrigatórios',
    value: {
      email: 'joao.silva@email.com',
      password: 'senhaSegura123',
      firstName: 'João',
      lastName: 'Silva',
    },
  };
}

export class SignUpResponseExamplesDto {
  static readonly SUCESSO = {
    summary: 'Cadastro realizado com sucesso',
    value: {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImpvYW8uc2lsdmFAZW1haWwuY29tIiwic3ViIjoiMTIzZTQ1NjctZTg5Yi0xMmQzLWE0NTYtNDI2NjE0MTc0MDAwIiwiaWF0IjoxNzE2MjAwMDAwLCJleHAiOjE3MTYyMDM2MDB9.ABC123def456',
    },
  };

  static readonly ERRO_EMAIL_DUPLICADO = {
    summary: 'Email já cadastrado',
    value: {
      statusCode: 409,
      message: 'Email já está em uso no sistema',
      error: 'Conflict',
    },
  };

  static readonly ERRO_VALIDACAO = {
    summary: 'Dados de entrada inválidos',
    value: {
      statusCode: 400,
      message: [
        'Email deve ser um endereço válido',
        'Senha deve ter pelo menos 6 caracteres',
        'Primeiro nome é obrigatório',
        'Sobrenome é obrigatório',
      ],
      error: 'Bad Request',
    },
  };
}
