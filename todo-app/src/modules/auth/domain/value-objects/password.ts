import { InvalidPasswordException } from '../exceptions/invalid-password-exception';

export class Password {
  Password: string;

  private constructor(password: string) {
    this.Password = password;
  }
  static create(password: string): Password {
    if (!this.isValidPassword(password)) {
      throw new InvalidPasswordException();
    }
    return new Password(password);
  }

  private static isValidPassword(password: string): boolean {
    // must be at least 6 characters long and maximum  12
    // can contain letters, numbers, and special characters
    // should not contain spaces
    // should have at least one capital letter, one lowercase letter, one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,12}$/;
    return re.test(password);
  }
}
