import { PartialType } from '@nestjs/mapped-types';
import { UserId } from '../value-objects/user-id';

class _UpdateUserDto {
  firstName: string | null;
  lastName: string | null;
}

export class UpdateUserDto extends PartialType(_UpdateUserDto) {
  id: UserId;
}
