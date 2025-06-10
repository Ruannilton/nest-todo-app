export class Password {
  Password: string;

  private constructor(password: string) {
    this.Password = password;
  }
  static create(password: string): Password {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    return new Password(password);
  }
}
