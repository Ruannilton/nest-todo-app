import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';

export class SignInDto {
  email: Email;
  password: Password;
}

export class SignInOutputDto {
  userId: string;
  email: string;

  constructor(userId: string, email: string) {
    this.userId = userId;
    this.email = email;
  }
}
