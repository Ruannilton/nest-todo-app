import {
  ValidationErrorResponseDto,
  NotFoundErrorResponseDto,
} from '../common/dto/error-response.dto';
import {
  UserResponseExamplesDto,
  UpdateUserExamplesDto,
  UpdateUserResponseExamplesDto,
} from './dto/user-examples.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserRequest } from './dto/update-user.dto';

const FIND_ONE_OPERATION = {
  summary: 'Buscar usuário por ID',
  description: 'Retorna os dados de um usuário específico baseado no seu ID.',
};

const FIND_ONE_PARAM = {
  name: 'id',
  description: 'ID único do usuário',
  format: 'uuid',
};

const FIND_ONE_RESPONSE_200 = {
  status: 200,
  description: 'Usuário encontrado com sucesso',
  type: UserResponseDto,
  examples: {
    usuario_encontrado: UserResponseExamplesDto.USUARIO_ENCONTRADO,
  },
};

const FIND_ONE_RESPONSE_400 = {
  status: 400,
  description: 'ID inválido',
  type: ValidationErrorResponseDto,
  examples: {
    id_invalido: UserResponseExamplesDto.ERRO_ID_INVALIDO,
  },
};

const FIND_ONE_RESPONSE_404 = {
  status: 404,
  description: 'Usuário não encontrado',
  type: NotFoundErrorResponseDto,
  examples: {
    usuario_nao_encontrado: UserResponseExamplesDto.ERRO_NAO_ENCONTRADO,
  },
};

const UPDATE_OPERATION = {
  summary: 'Atualizar usuário',
  description: 'Atualiza parcialmente os dados do usuário autenticado.',
};

const UPDATE_BODY = {
  type: UpdateUserRequest,
  examples: {
    atualizar_nome: UpdateUserExamplesDto.ATUALIZAR_NOME,
    atualizar_email: UpdateUserExamplesDto.ATUALIZAR_EMAIL,
    atualizar_completo: UpdateUserExamplesDto.ATUALIZAR_COMPLETO,
  },
};

const UPDATE_RESPONSE_204 = {
  status: 204,
  description: 'Usuário atualizado com sucesso',
};

const UPDATE_RESPONSE_400 = {
  status: 400,
  description: 'Dados inválidos ou email já em uso',
  type: ValidationErrorResponseDto,
  examples: {
    email_duplicado: UpdateUserResponseExamplesDto.ERRO_EMAIL_DUPLICADO,
    dados_invalidos: UpdateUserResponseExamplesDto.ERRO_VALIDACAO,
  },
};

const UPDATE_RESPONSE_404 = {
  status: 404,
  description: 'Usuário não encontrado',
  type: NotFoundErrorResponseDto,
};

const DELETE_OPERATION = {
  summary: 'Excluir usuário',
  description: 'Remove permanentemente o usuário autenticado do sistema.',
};

const DELETE_RESPONSE_204 = {
  status: 204,
  description: 'Usuário excluído com sucesso',
};

const DELETE_RESPONSE_404 = {
  status: 404,
  description: 'Usuário não encontrado',
  type: NotFoundErrorResponseDto,
};

export {
  FIND_ONE_OPERATION,
  FIND_ONE_PARAM,
  FIND_ONE_RESPONSE_200,
  FIND_ONE_RESPONSE_400,
  FIND_ONE_RESPONSE_404,
  UPDATE_OPERATION,
  UPDATE_BODY,
  UPDATE_RESPONSE_204,
  UPDATE_RESPONSE_400,
  UPDATE_RESPONSE_404,
  DELETE_OPERATION,
  DELETE_RESPONSE_204,
  DELETE_RESPONSE_404,
};
