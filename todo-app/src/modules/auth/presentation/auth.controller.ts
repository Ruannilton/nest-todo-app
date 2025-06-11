import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
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
import * as AuthDoc from './auth.documentation';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly signUpUsecase: SignUpUseCase,
    private readonly jwtPresenterService: JwtPresenterService,
  ) {}

  @Post('signin')
  @ApiOperation(AuthDoc.SIGNIN_OPERATION)
  @ApiBody(AuthDoc.SIGNIN_BODY)
  @ApiResponse(AuthDoc.SIGNIN_RESPONSE_200)
  @ApiResponse(AuthDoc.SIGNIN_RESPONSE_400)
  @ApiResponse(AuthDoc.SIGNIN_RESPONSE_401)
  async signIn(
    @Body(new ValidationPipe()) request: SignInRequest,
  ): Promise<SignInResponseDto> {
    const input = new SignInDto();
    input.email = Email.create(request.email);
    input.password = Password.create(request.password);

    const { email, userId } = await this.signInUseCase.execute(input);
    const token = this.jwtPresenterService.generateToken(email, userId);
    return token;
  }

  @Post('signup')
  @ApiOperation(AuthDoc.SIGNUP_OPERATION)
  @ApiBody(AuthDoc.SIGNUP_BODY)
  @ApiResponse(AuthDoc.SIGNUP_RESPONSE_201)
  @ApiResponse(AuthDoc.SIGNUP_RESPONSE_400)
  @ApiResponse(AuthDoc.SIGNUP_RESPONSE_409)
  async signUp(
    @Body(new ValidationPipe()) request: SignUpRequest,
  ): Promise<SignUpResponseDto> {
    const input = new SignUpDto();
    input.email = Email.create(request.email);
    input.password = Password.create(request.password);
    input.name = Name.create(request.firstName, request.lastName);
    const { email, userId } = await this.signUpUsecase.execute(input);
    const token = this.jwtPresenterService.generateToken(email, userId);
    return token;
  }
}
