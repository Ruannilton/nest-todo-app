import { Name } from '../../../tasks/domain/value-objects/name';
import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';

export interface SignUpDto {
  email: Email;
  password: Password;
  name: Name;
}

export class SignUpOutputDto {
  userId: string;
  email: string;

  constructor(userId: string, email: string) {
    this.userId = userId;
    this.email = email;
  }
}
