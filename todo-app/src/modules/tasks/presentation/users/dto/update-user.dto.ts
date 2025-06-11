import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Length } from 'class-validator';
import * as DtoDoc from './dto.documentation';

export class UpdateUserRequest {
  @ApiProperty(DtoDoc.UPDATE_FIRST_NAME_PROPERTY)
  @IsOptional()
  @IsString()
  @Length(1, 50)
  firstName?: string;

  @ApiProperty(DtoDoc.UPDATE_LAST_NAME_PROPERTY)
  @IsOptional()
  @IsString()
  @Length(1, 50)
  secondName?: string;
}
