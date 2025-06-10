export class Name {
  First: string;
  Last: string;

  private constructor(first: string, last: string) {
    this.First = first;
    this.Last = last;
  }
  static create(first: string, last: string): Name {
    if (!first || !last) {
      throw new Error('First and Last names are required');
    }
    return new Name(first, last);
  }
}
