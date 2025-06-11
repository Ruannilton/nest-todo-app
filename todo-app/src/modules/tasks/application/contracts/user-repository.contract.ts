import { User } from '../../../../modules/tasks/domain/entities/user.entity';

export abstract class IUserRepository {
  abstract createUser(user: User): Promise<User>;
  abstract getUserById(id: string): Promise<User | null>;
  abstract updateUser(user: User): Promise<User>;
  abstract deleteUser(id: string): Promise<void>;
}
