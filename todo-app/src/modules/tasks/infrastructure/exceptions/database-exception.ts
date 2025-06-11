import { InfrastructureException } from '../../../../core/contracts/infrastructure-exception';

export class DatabaseException extends InfrastructureException {
  constructor(innerEx: Error) {
    super('Database operation failed');
    this.cause = innerEx;
    this.name = 'DatabaseException';
  }
}
