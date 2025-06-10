
export class TaskDescription {
  Description: string;
  private constructor(description: string) {
    this.Description = description;
  }
  static create(description: string | null = ''): TaskDescription {
    if (description == null || description.length === 0) {
      return new TaskDescription('');
    }
    if (!description || description.length < 5) {
      throw new Error('Task description must be at least 5 characters long');
    }
    if (description.length > 500) {
      throw new Error('Task description must not exceed 500 characters');
    }
    return new TaskDescription(description);
  }
}
