import { InvalidNameException } from '../exceptions/invalid-name-exception';

export class Name {
  First: string;
  Last: string;

  private constructor(first: string, last: string) {
    this.First = first;
    this.Last = last;
  }
  static create(first: string, last: string): Name {
    if (!this.isValidName(first) || !this.isValidName(last)) {
      throw new InvalidNameException(first, last);
    }
    return new Name(first, last);
  }

  private static isValidName(name: string): boolean {
    return !!name && name.length >= 3 && name.length <= 64;
  }
}
