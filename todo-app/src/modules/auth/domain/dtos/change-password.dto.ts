import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';

export class ChangePasswordDto {
  email: Email;
  oldPassword: Password;
  newPassword: Password;
}
