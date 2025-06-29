import { InjectRepository } from '@nestjs/typeorm';
import { IIdentityRepository } from 'src/modules/auth/application/contracts/identity-repository.contract';
import { Identity } from 'src/modules/auth/domain/entities/identity.entity';
import { IdentityTable } from '../schemas/identity-table.table';
import { Repository } from 'typeorm';

export class IdentityRepository extends IIdentityRepository {
  constructor(
    @InjectRepository(IdentityTable)
    private readonly identityTableRepository: Repository<IdentityTable>,
  ) {
    super();
  }

  async createIdentity(identity: Identity): Promise<void> {
    const identityTable = IdentityTable.fromDomain(identity);
    await this.identityTableRepository.save(identityTable);
  }
  async getIdentityByEmail(email: string): Promise<Identity | null> {
    const identityTable = await this.identityTableRepository.findOne({
      where: { email },
    });
    if (!identityTable) {
      return null;
    }
    return IdentityTable.toDomain(identityTable);
  }
  async updateIdentity(identity: Identity): Promise<void> {
    const identityTable = IdentityTable.fromDomain(identity);
    await this.identityTableRepository.save(identityTable);
  }

  async deleteIdentity(email: string): Promise<void> {
    await this.identityTableRepository.delete({ email });
  }
}
