import { InvalidEmailException } from '../exceptions/invalid-email-exception';

export class Email {
  Address: string;
  private constructor(address: string) {
    this.Address = address;
  }
  static create(address: string): Email {
    if (!this.isValidEmail(address)) {
      throw new InvalidEmailException(address);
    }
    return new Email(address);
  }

  private static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
