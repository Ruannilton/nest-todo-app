import { UserId } from '../../../tasks/domain/value-objects/user-id';
import * as bcrypt from 'bcrypt'; // Ensure bcrypt is installed in your project
import { Password } from '../value-objects/password';
import { Email } from '../value-objects/email';
export class Identity {
  passwordHash: string;
  email: Email;
  createdAt: Date;
  updatedAt: Date | null;
  userId: UserId;

  constructor(
    userId: UserId,
    email: Email,
    passwordHash: string,
    createdAt: Date = new Date(),
    updatedAt: Date | null = null,
  ) {
    this.userId = userId;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(userId: UserId, email: Email, password: Password): Identity {
    // Simple salt generation
    const passwordHash: string = this.hashPassword(password);
    return new Identity(userId, email, passwordHash);
  }
  private static hashPassword(password: Password): string {
    const salt = 3 + Math.random() * 5;
    const saltRounds = Math.floor(salt);
    const hash = bcrypt.hashSync(password.Password, saltRounds);
    return hash;
  }

  public validatePassword(password: Password): boolean {
    return bcrypt.compareSync(password.Password, this.passwordHash);
  }
}
