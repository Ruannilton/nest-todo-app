import { Name } from '../value-objects/name';
import { UserId } from '../value-objects/user-id';

export class User {
  id: UserId;
  name: Name;

  constructor(id: UserId, name: Name) {
    this.id = id;
    this.name = name;
  }
}
