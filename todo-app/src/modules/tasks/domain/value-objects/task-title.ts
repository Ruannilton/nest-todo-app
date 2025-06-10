
export class TaskTitle {
  Title: string;
  private constructor(title: string) {
    this.Title = title;
  }
  static create(title: string): TaskTitle {
    if (!title || title.length < 3) {
      throw new Error('Task title must be at least 3 characters long');
    }
    return new TaskTitle(title);
  }
}
