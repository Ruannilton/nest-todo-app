import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SignInRequest } from './dto/signin.dto';
import { SignInUseCase } from '../application/use-cases/signin.use-case';
import { SignUpUseCase } from '../application/use-cases/signup.use-case';
import { SignUpRequest } from './dto/signup.dto';
import { SignInDto } from '../domain/dtos/signin.dto';
import { Email } from '../domain/value-objects/email';
import { Password } from '../domain/value-objects/password';
import { SignUpDto } from '../domain/dtos/signup.dto';
import { Name } from '../../tasks/domain/value-objects/name';
import { JwtPresenterService } from '../service/jwt-presenter.service';
import { SignInResponseDto, SignUpResponseDto } from './dto/auth-response.dto';
import {
  ErrorResponseDto,
  ValidationErrorResponseDto,
} from '../../tasks/presentation/common/dto/error-response.dto';
import {
  SignInExamplesDto,
  SignInResponseExamplesDto,
  SignUpExamplesDto,
  SignUpResponseExamplesDto,
} from './dto/auth-examples.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUsecase: SignUpUseCase,
    private readonly jwtPresenterService: JwtPresenterService,
  ) {}

  @Post('signin')
  @ApiOperation({
    summary: 'Autenticar usuário',
    description: 'Realiza login do usuário no sistema usando email e senha.',
  })
  @ApiBody({
    type: SignInRequest,
    examples: {
      login_sucesso: SignInExamplesDto.LOGIN_SUCESSO,
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: SignInResponseDto,
    examples: {
      sucesso: SignInResponseExamplesDto.SUCESSO,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    type: ValidationErrorResponseDto,
    examples: {
      validacao: SignInResponseExamplesDto.ERRO_VALIDACAO,
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
    type: ErrorResponseDto,
    examples: {
      credenciais: SignInResponseExamplesDto.ERRO_CREDENCIAIS,
    },
  })
  async signIn(@Body() request: SignInRequest): Promise<SignInResponseDto> {
    const input = new SignInDto();
    input.email = Email.create(request.email);
    input.password = Password.create(request.password);

    const { email, userId } = await this.signInUseCase.execute(input);
    const token = this.jwtPresenterService.generateToken(email, userId);
    return token;
  }

  @Post('signup')
  @ApiOperation({
    summary: 'Criar nova conta',
    description: 'Registra um novo usuário no sistema.',
  })
  @ApiBody({
    type: SignUpRequest,
    examples: {
      cadastro_completo: SignUpExamplesDto.CADASTRO_COMPLETO,
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Conta criada com sucesso',
    type: SignUpResponseDto,
    examples: {
      sucesso: SignUpResponseExamplesDto.SUCESSO,
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados de entrada inválidos',
    type: ValidationErrorResponseDto,
    examples: {
      validacao: SignUpResponseExamplesDto.ERRO_VALIDACAO,
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
    type: ErrorResponseDto,
    examples: {
      email_duplicado: SignUpResponseExamplesDto.ERRO_EMAIL_DUPLICADO,
    },
  })
  async signUp(@Body() request: SignUpRequest): Promise<SignUpResponseDto> {
    const input = new SignUpDto();
    input.email = Email.create(request.email);
    input.password = Password.create(request.password);
    input.name = Name.create(request.firstName, request.lastName);
    const { email, userId } = await this.signUpUsecase.execute(input);
    const token = this.jwtPresenterService.generateToken(email, userId);
    return token;
  }
}
