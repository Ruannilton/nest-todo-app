import { InjectRepository } from '@nestjs/typeorm';
import { IIdentityRepository } from 'src/modules/auth/application/contracts/identity-repository.contract';
import { Identity } from 'src/modules/auth/domain/entities/identity.entity';
import { IdentityTable } from '../schemas/identity-table.table';
import { Repository } from 'typeorm';
import { DatabaseException } from '../../exceptions/database-exception';

export class IdentityRepository extends IIdentityRepository {
  constructor(
    @InjectRepository(IdentityTable)
    private readonly identityTableRepository: Repository<IdentityTable>,
  ) {
    super();
  }

  async createIdentity(identity: Identity): Promise<void> {
    try {
      const identityTable = IdentityTable.fromDomain(identity);
      await this.identityTableRepository.save(identityTable);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
  async getIdentityByEmail(email: string): Promise<Identity | null> {
    try {
      const identityTable = await this.identityTableRepository.findOne({
        where: { email },
      });
      if (!identityTable) {
        return null;
      }
      return IdentityTable.toDomain(identityTable);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
  async updateIdentity(identity: Identity): Promise<void> {
    try {
      const identityTable = IdentityTable.fromDomain(identity);
      await this.identityTableRepository.save(identityTable);
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }

  async deleteIdentity(email: string): Promise<void> {
    try {
      await this.identityTableRepository.delete({ email });
    } catch (e) {
      const error = e as Error;
      throw new DatabaseException(error);
    }
  }
}
