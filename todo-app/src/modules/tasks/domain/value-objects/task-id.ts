import { InvalidIdException } from '../exceptions/invalid-id-exception';

export class TaskId {
  Id: string;
  private constructor(id: string) {
    this.Id = id;
  }
  static create(id: string): TaskId {
    if (!this.isUUID(id)) {
      throw new InvalidIdException(id);
    }

    return new TaskId(id);
  }

  private static isUUID(str: string): boolean {
    if (!str || str == '') return false;
    const uuidRegex =
      /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return uuidRegex.test(str);
  }

  static empty(): TaskId {
    return new TaskId('');
  }
}
