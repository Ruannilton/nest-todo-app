import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1749531829888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "firstName" varchar NOT NULL,
        "lastName" varchar NOT NULL
      )
    `);

    // Criar tabela tasks
    await queryRunner.query(`
      CREATE TABLE "tasks" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "title" varchar NOT NULL,
        "description" varchar NOT NULL,
        "userId" uuid NOT NULL,
        "completed" boolean NOT NULL DEFAULT false,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NULL,
        "completedAt" timestamp NULL
      )
    `);

    // Criar tabela identities
    await queryRunner.query(`
      CREATE TABLE "identities" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "email" varchar UNIQUE NOT NULL,
        "passwordHash" varchar NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        "userId" uuid NOT NULL
      )
    `);

    // Adicionar foreign key de tasks para users
    await queryRunner.query(`
      ALTER TABLE "tasks" 
      ADD CONSTRAINT "fk_task_user" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") 
      ON DELETE CASCADE
    `);

    // Adicionar foreign key de identities para users
    await queryRunner.query(`
      ALTER TABLE "identities" 
      ADD CONSTRAINT "fk_identity_user" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") 
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign key constraints
    await queryRunner.query(
      `ALTER TABLE "identities" DROP CONSTRAINT "fk_identity_user"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" DROP CONSTRAINT "fk_task_user"`,
    );

    // Remover tabelas na ordem inversa
    await queryRunner.query(`DROP TABLE "identities"`);
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
