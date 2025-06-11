const FIRST_NAME_PROPERTY = {
  description:
    'Primeiro nome do usuário. Deve conter apenas letras e ter pelo menos 1 caractere.',
  example: 'João',
  minLength: 1,
  maxLength: 50,
};

const LAST_NAME_PROPERTY = {
  description:
    'Sobrenome do usuário. Deve conter apenas letras e ter pelo menos 1 caractere.',
  example: 'Silva',
  minLength: 1,
  maxLength: 50,
};

const PASSWORD_PROPERTY = {
  description:
    'Senha do usuário. Deve ter pelo menos 6 caracteres para garantir segurança mínima.',
  example: 'senhaSegura123',
  minLength: 6,
  maxLength: 100,
  format: 'password',
};

const ID_PROPERTY = {
  description:
    'Identificador único do usuário no formato UUID v4. Gerado automaticamente pelo sistema.',
  example: '123e4567-e89b-12d3-a456-426614174000',
  format: 'uuid',
};

const EMAIL_PROPERTY = {
  description:
    'Endereço de email único do usuário. Usado para login e comunicações.',
  example: 'joao.silva@email.com',
  format: 'email',
  maxLength: 255,
};

const UPDATE_FIRST_NAME_PROPERTY = {
  description: 'Novo primeiro nome do usuário',
  example: 'João Carlos',
  required: false,
  minLength: 1,
  maxLength: 50,
};

const UPDATE_LAST_NAME_PROPERTY = {
  description: 'Novo sobrenome do usuário',
  example: 'Santos Silva',
  required: false,
  minLength: 1,
  maxLength: 50,
};

export {
  FIRST_NAME_PROPERTY,
  LAST_NAME_PROPERTY,
  PASSWORD_PROPERTY,
  ID_PROPERTY,
  EMAIL_PROPERTY,
  UPDATE_FIRST_NAME_PROPERTY,
  UPDATE_LAST_NAME_PROPERTY,
};
