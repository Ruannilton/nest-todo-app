import { Identity } from '../../domain/entities/identity.entity';

export abstract class IIdentityRepository {
  abstract createIdentity(identity: Identity): Promise<void>;
  abstract getIdentityByEmail(email: string): Promise<Identity | null>;
  abstract updateIdentity(identity: Identity): Promise<void>;
  abstract deleteIdentity(email: string): Promise<void>;
}
