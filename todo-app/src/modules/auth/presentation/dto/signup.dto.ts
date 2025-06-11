import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsStrongPassword } from 'class-validator';
import * as DtoValidation from './dto.validation';
import * as DtoDoc from './dto.documentation';

export class SignUpRequest {
  @ApiProperty(DtoDoc.EMAIL_PROPERTY)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty(DtoDoc.PASSWORD_PROPERTY)
  @IsNotEmpty()
  @IsStrongPassword(DtoValidation.PASSWORD_VALIDATION)
  password: string;

  @ApiProperty(DtoDoc.FIRST_NAME_PROPERTY)
  firstName: string;

  @ApiProperty(DtoDoc.LAST_NAME_PROPERTY)
  lastName: string;
}
