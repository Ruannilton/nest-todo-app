import { InvalidDescriptionException } from '../exceptions/invalid-description-exception';

export class TaskDescription {
  Description: string;
  private constructor(description: string) {
    this.Description = description;
  }
  static create(description: string | null = ''): TaskDescription {
    if (description == null || description.length === 0) {
      return new TaskDescription('');
    }

    if (!this.isValid(description)) {
      throw new InvalidDescriptionException(description);
    }

    return new TaskDescription(description);
  }

  private static isValid(description: string): boolean {
    return (
      !!description || (description.length >= 5 && description.length <= 500)
    );
  }
}
