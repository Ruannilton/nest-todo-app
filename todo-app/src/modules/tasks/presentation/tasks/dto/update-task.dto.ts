import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';
import * as DtoValidation from './dto.validation';
import * as DtoDoc from './dto.documentation';

export class UpdateTaskRequest {
  @ApiProperty(DtoDoc.TASK_TITLE_UPDATE_PROPERTY)
  @IsOptional()
  @IsString()
  @MinLength(DtoValidation.TASK_TITLE_VALIDATION.minLength)
  @MaxLength(DtoValidation.TASK_TITLE_VALIDATION.maxLength)
  title?: string;

  @ApiProperty(DtoDoc.TASK_DESCRIPTION_UPDATE_PROPERTY)
  @IsOptional()
  @IsString()
  @MinLength(DtoValidation.TASK_DESCRIPTION_VALIDATION.minLength)
  @MaxLength(DtoValidation.TASK_DESCRIPTION_VALIDATION.maxLength)
  description?: string;
}
