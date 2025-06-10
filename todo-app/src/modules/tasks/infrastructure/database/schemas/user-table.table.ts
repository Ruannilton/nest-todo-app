import { User } from 'src/modules/tasks/domain/entities/user.entity';
import { UserId } from 'src/modules/tasks/domain/value-objects/user-id';
import { Name } from 'src/modules/tasks/domain/value-objects/name';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('users')
export class UserTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  firstName: string;
  @Column()
  lastName: string;

  static fromDomain(user: User): UserTable {
    const userTable = new UserTable();
    // Only set ID if it's not empty (for updates)
    if (user.id.Id && user.id.Id !== '') {
      userTable.id = user.id.Id;
    }
    userTable.firstName = user.name.First;
    userTable.lastName = user.name.Last;
    return userTable;
  }
  static toDomain(userTable: UserTable): User {
    return new User(
      UserId.create(userTable.id),
      Name.create(userTable.firstName, userTable.lastName),
    );
  }
}
