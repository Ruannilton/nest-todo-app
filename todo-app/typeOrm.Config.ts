import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserTable } from './src/modules/tasks/infrastructure/database/schemas/user-table.table';
import { TaskTable } from './src/modules/tasks/infrastructure/database/schemas/task-table.table';
import { config } from 'dotenv';
import { IdentityTable } from 'src/modules/auth/infrastructure/database/schemas/identity-table.table';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: configService.getOrThrow<number>('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USER'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_NAME'),
  entities: [UserTable, TaskTable, IdentityTable],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false, // Sempre false em produção
  logging: true,
  migrationsRun: false,
  migrationsTableName: 'migrations',
});
