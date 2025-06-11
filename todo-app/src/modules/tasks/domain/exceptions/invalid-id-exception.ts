import { DomainException } from '../../../../core/contracts/domain-exception';

export class InvalidIdException extends DomainException {
  constructor(id: string) {
    super(`Invalid ID: "${id}". ID must be a valid UUID.`);
    this.name = 'InvalidIdException';
  }
}
