import { PartialType } from '@nestjs/mapped-types';
import { UserId } from '../value-objects/user-id';
import { Name } from '../value-objects/name';

class _UpdateUserDto {
  name: Name;
}

export class UpdateUserDto extends PartialType(_UpdateUserDto) {
  id: UserId;
}
