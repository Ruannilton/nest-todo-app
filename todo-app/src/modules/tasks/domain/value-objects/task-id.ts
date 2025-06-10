
export class TaskId {
  Id: string;
  private constructor(id: string) {
    this.Id = id;
  }
  static create(id: string): TaskId {
    if (!id) {
      throw new Error('Task ID is required');
    }
    return new TaskId(id);
  }

  static empty(): TaskId {
    return new TaskId('');
  }
}
