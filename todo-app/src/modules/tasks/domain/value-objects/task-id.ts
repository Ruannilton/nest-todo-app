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
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  }

  static empty(): TaskId {
    return new TaskId('');
  }
}
