import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import * as DtoValidation from './dto.validation';
import * as DtoDoc from './dto.documentation';
export class SignInRequest {
  @ApiProperty(DtoDoc.EMAIL_PROPERTY)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty(DtoDoc.PASSWORD_PROPERTY)
  @IsNotEmpty()
  @IsStrongPassword(DtoValidation.PASSWORD_VALIDATION)
  password: string;
}
