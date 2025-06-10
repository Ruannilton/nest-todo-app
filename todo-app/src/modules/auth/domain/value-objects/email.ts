export class Email {
  Address: string;
  private constructor(address: string) {
    this.Address = address;
  }
  static create(address: string): Email {
    if (!address || !this.isValidEmail(address)) {
      throw new Error('Invalid email address');
    }
    return new Email(address);
  }

  private static isValidEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
