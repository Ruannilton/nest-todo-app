import { Name } from '../value-objects/name';

export class CreateUserDto {
  name: Name;

  constructor(name: string, lastName: string) {
    this.name = Name.create(name, lastName);
  }
}
