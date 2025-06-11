import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import * as DtoValidation from './dto.validation';
import * as DtoDoc from './dto.documentation';

export class CreateTaskRequest {
  @ApiProperty(DtoDoc.TASK_TITLE_PROPERTY)
  @IsNotEmpty()
  @IsString()
  @MinLength(DtoValidation.TASK_TITLE_VALIDATION.minLength)
  @MaxLength(DtoValidation.TASK_TITLE_VALIDATION.maxLength)
  title: string;

  @ApiProperty(DtoDoc.TASK_DESCRIPTION_PROPERTY)
  @IsOptional()
  @IsString()
  @MinLength(DtoValidation.TASK_DESCRIPTION_VALIDATION.minLength)
  @MaxLength(DtoValidation.TASK_DESCRIPTION_VALIDATION.maxLength)
  description: string | null;
}
