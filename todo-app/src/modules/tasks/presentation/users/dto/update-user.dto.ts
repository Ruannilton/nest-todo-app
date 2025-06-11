import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';
import * as DtoDoc from './dto.documentation';

export class UpdateUserRequest {
  @ApiProperty(DtoDoc.UPDATE_FIRST_NAME_PROPERTY)
  @Length(3, 50)
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty(DtoDoc.UPDATE_LAST_NAME_PROPERTY)
  @Length(3, 50)
  @IsOptional()
  @IsString()
  secondName?: string;
}
