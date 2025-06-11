import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
  Min,
  Max,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Task } from 'src/modules/tasks/domain/entities/task.entity';
import * as DtoValidation from './dto.validation';
import * as DtoDoc from './dto.documentation';

export class ListTasksRequest {
  @ApiProperty(DtoDoc.TASK_FILTER_TITLE_PROPERTY)
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

  @ApiProperty(DtoDoc.TASK_FILTER_COMPLETED_PROPERTY)
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  completed?: boolean;

  @ApiProperty(DtoDoc.TASK_FILTER_CREATED_FROM_PROPERTY)
  @IsOptional()
  @IsDateString()
  createdFrom?: Date;

  @ApiProperty(DtoDoc.TASK_FILTER_CREATED_TO_PROPERTY)
  @IsOptional()
  @IsDateString()
  createdTo?: Date;

  @ApiProperty(DtoDoc.PAGINATION_PAGE_PROPERTY)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty(DtoDoc.PAGINATION_LIMIT_PROPERTY)
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(DtoValidation.PAGINATION_VALIDATION.limit.max)
  @Type(() => Number)
  limit: number = DtoValidation.PAGINATION_VALIDATION.limit.default;
}

export interface ListTasksResult {
  tasks: Task[];
  total: number;
}
