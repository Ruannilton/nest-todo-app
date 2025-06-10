export class UserId {
  Id: string;
  private constructor(id: string) {
    this.Id = id;
  }
  static create(id: string): UserId {
    if (!id) {
      throw new Error('User ID is required');
    }
    return new UserId(id);
  }

  static empty(): UserId {
    return new UserId('');
  }
}
