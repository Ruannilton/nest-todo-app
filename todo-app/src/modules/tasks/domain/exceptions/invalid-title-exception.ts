import { DomainException } from '../../../../core/contracts/domain-exception';

export class InvalidTitleException extends DomainException {
  constructor(title: string) {
    super(
      `Invalid title: "${title}". Title must be at least 3 characters long and not exceed 100 characters.`,
    );
    this.name = 'InvalidTitleException';
  }
}
