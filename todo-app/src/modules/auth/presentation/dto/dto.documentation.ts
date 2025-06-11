const EMAIL_PROPERTY = {
  description: 'Email do usuário',
  example: 'joao.silva@email.com',
  format: 'email',
};

const PASSWORD_PROPERTY = {
  description: 'Senha do usuário para autenticação',
  example: 'senhaSegura123',
  minLength: 6,
  format: 'password',
};

const FIRST_NAME_PROPERTY = {
  description: 'Primeiro nome do usuário',
  example: 'João',
  minLength: 1,
  maxLength: 50,
};

const LAST_NAME_PROPERTY = {
  description: 'Sobrenome do usuário',
  example: 'Silva',
  minLength: 1,
  maxLength: 50,
};

export {
  EMAIL_PROPERTY,
  PASSWORD_PROPERTY,
  FIRST_NAME_PROPERTY,
  LAST_NAME_PROPERTY,
};
