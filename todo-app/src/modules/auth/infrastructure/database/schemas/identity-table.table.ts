import {
  Identity,
} from 'src/modules/auth/domain/entities/identity.entity';
import { Email } from 'src/modules/auth/domain/value-objects/email';
import { UserId } from "src/modules/tasks/domain/value-objects/user-id";
import { UserTable } from 'src/modules/tasks/infrastructure/database/schemas/user-table.table';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('identities')
export class IdentityTable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  passwordHash: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => UserTable, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserTable;

  static fromDomain(identity: Identity): IdentityTable {
    const identityTable = new IdentityTable();
    identityTable.email = identity.email.Address;
    identityTable.passwordHash = identity.passwordHash;
    identityTable.userId = identity.userId.Id;
    return identityTable;
  }

  static toDomain(identityTable: IdentityTable): Identity {
    return new Identity(
      UserId.create(identityTable.userId),
      Email.create(identityTable.email),
      identityTable.passwordHash,
      identityTable.createdAt,
      identityTable.updatedAt,
    );
  }
}
