import {
  ErrorResponseDto,
  ValidationErrorResponseDto,
} from 'src/modules/tasks/presentation/common/dto/error-response.dto';
import {
  SignInExamplesDto,
  SignInResponseExamplesDto,
  SignUpExamplesDto,
  SignUpResponseExamplesDto,
} from './dto/auth-examples.dto';
import { SignInResponseDto, SignUpResponseDto } from './dto/auth-response.dto';
import { SignInRequest } from './dto/signin.dto';
import { SignUpRequest } from './dto/signup.dto';

const SIGNIN_OPERATION = {
  summary: 'Autenticar usuário',
  description: 'Realiza login do usuário no sistema usando email e senha.',
};

const SIGNIN_BODY = {
  type: SignInRequest,
  examples: {
    login_sucesso: SignInExamplesDto.LOGIN_SUCESSO,
  },
};

const SIGNIN_RESPONSE_200 = {
  status: 200,
  description: 'Login realizado com sucesso',
  type: SignInResponseDto,
  examples: {
    sucesso: SignInResponseExamplesDto.SUCESSO,
  },
};

const SIGNIN_RESPONSE_400 = {
  status: 400,
  description: 'Dados de entrada inválidos',
  type: ValidationErrorResponseDto,
  examples: {
    validacao: SignInResponseExamplesDto.ERRO_VALIDACAO,
  },
};

const SIGNIN_RESPONSE_401 = {
  status: 401,
  description: 'Credenciais inválidas',
  type: ErrorResponseDto,
  examples: {
    credenciais: SignInResponseExamplesDto.ERRO_CREDENCIAIS,
  },
};

const SIGNUP_OPERATION = {
  summary: 'Criar nova conta',
  description: 'Registra um novo usuário no sistema.',
};

const SIGNUP_BODY = {
  type: SignUpRequest,
  examples: {
    cadastro_completo: SignUpExamplesDto.CADASTRO_COMPLETO,
  },
};

const SIGNUP_RESPONSE_201 = {
  status: 201,
  description: 'Conta criada com sucesso',
  type: SignUpResponseDto,
  examples: {
    sucesso: SignUpResponseExamplesDto.SUCESSO,
  },
};

const SIGNUP_RESPONSE_400 = {
  status: 400,
  description: 'Dados de entrada inválidos',
  type: ValidationErrorResponseDto,
  examples: {
    validacao: SignUpResponseExamplesDto.ERRO_VALIDACAO,
  },
};

const SIGNUP_RESPONSE_409 = {
  status: 409,
  description: 'Email já cadastrado',
  type: ErrorResponseDto,
  examples: {
    email_duplicado: SignUpResponseExamplesDto.ERRO_EMAIL_DUPLICADO,
  },
};

export {
  SIGNIN_OPERATION,
  SIGNIN_BODY,
  SIGNIN_RESPONSE_200,
  SIGNIN_RESPONSE_400,
  SIGNIN_RESPONSE_401,
  SIGNUP_OPERATION,
  SIGNUP_BODY,
  SIGNUP_RESPONSE_201,
  SIGNUP_RESPONSE_400,
  SIGNUP_RESPONSE_409,
};
