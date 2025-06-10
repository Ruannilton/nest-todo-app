import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from 'src/modules/tasks/application/contracts/user-repository.contract';
import { User } from 'src/modules/tasks/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { UserTable } from '../schemas/user-table.table';

@Injectable()
export class UserRepository extends IUserRepository {
  constructor(
    @InjectRepository(UserTable)
    private readonly repository: Repository<UserTable>,
  ) {
    super();
  }
  async createUser(user: User): Promise<User> {
    const userTable = UserTable.fromDomain(user);
    const userAdded = await this.repository.save(userTable);
    return UserTable.toDomain(userAdded);
  }
  async getUserById(id: string): Promise<User | null> {
    const userTable = await this.repository.findOne({ where: { id } });
    if (!userTable) {
      return null;
    }
    return UserTable.toDomain(userTable);
  }

  async updateUser(user: User): Promise<User> {
    const userTable = UserTable.fromDomain(user);
    const userUpdated = await this.repository.save(userTable);
    return UserTable.toDomain(userUpdated);
  }
  async deleteUser(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
