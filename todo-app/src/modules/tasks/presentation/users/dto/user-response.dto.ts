import { ApiProperty } from '@nestjs/swagger';
import * as DtoDoc from './dto.documentation';

export class UserResponseDto {
  @ApiProperty(DtoDoc.ID_PROPERTY)
  id: string;

  @ApiProperty(DtoDoc.FIRST_NAME_PROPERTY)
  firstName: string;

  @ApiProperty(DtoDoc.LAST_NAME_PROPERTY)
  lastName: string;

  @ApiProperty(DtoDoc.EMAIL_PROPERTY)
  email: string;
}
