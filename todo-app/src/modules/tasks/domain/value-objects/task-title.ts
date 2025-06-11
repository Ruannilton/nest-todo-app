import { InvalidTitleException } from '../exceptions/invalid-title-exception';

export class TaskTitle {
  Title: string;
  private constructor(title: string) {
    this.Title = title;
  }
  static create(title: string): TaskTitle {
    if (!this.isValid(title)) {
      throw new InvalidTitleException(title);
    }
    return new TaskTitle(title);
  }

  private static isValid(title: string): boolean {
    return !!title && title.length >= 3 && title.length <= 100;
  }
}
