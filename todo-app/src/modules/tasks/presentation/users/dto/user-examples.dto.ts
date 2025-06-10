// DTOs de exemplos para o módulo de usuários

export class UserResponseExamplesDto {
  static readonly USUARIO_ENCONTRADO = {
    summary: 'Usuário encontrado',
    value: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'João',
      lastName: 'Silva',
      email: 'joao.silva@email.com',
    },
  };

  static readonly ERRO_ID_INVALIDO = {
    summary: 'ID inválido',
    value: {
      statusCode: 400,
      message: ['ID deve ser um UUID válido'],
      error: 'Bad Request',
    },
  };

  static readonly ERRO_NAO_ENCONTRADO = {
    summary: 'Usuário não existe',
    value: {
      statusCode: 404,
      message: 'Usuário não encontrado',
      error: 'Not Found',
    },
  };
}

export class UpdateUserExamplesDto {
  static readonly ATUALIZAR_NOME = {
    summary: 'Atualizar apenas nome',
    value: {
      firstName: 'João Carlos',
      secondName: 'Santos',
    },
  };

  static readonly ATUALIZAR_EMAIL = {
    summary: 'Atualizar apenas email',
    value: {
      email: 'joao.santos@email.com',
    },
  };

  static readonly ATUALIZAR_COMPLETO = {
    summary: 'Atualizar todos os dados',
    value: {
      firstName: 'João Carlos',
      secondName: 'Santos Silva',
      email: 'joao.santos@email.com',
    },
  };
}

export class UpdateUserResponseExamplesDto {
  static readonly ERRO_EMAIL_DUPLICADO = {
    summary: 'Email já em uso',
    value: {
      statusCode: 400,
      message: ['Email já está em uso'],
      error: 'Bad Request',
    },
  };

  static readonly ERRO_VALIDACAO = {
    summary: 'Dados inválidos',
    value: {
      statusCode: 400,
      message: [
        'Email deve ser um endereço válido',
        'Nome deve ter pelo menos 1 caractere',
      ],
      error: 'Bad Request',
    },
  };
}
