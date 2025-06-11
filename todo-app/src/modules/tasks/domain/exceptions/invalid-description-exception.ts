import { DomainException } from '../../../../core/contracts/domain-exception';

export class InvalidDescriptionException extends DomainException {
  constructor(description: string) {
    super(
      `Invalid description: "${description}". When provided, description must be at least 5 characters long and not exceed 500 characters.`,
    );
    this.name = 'InvalidDescriptionException';
  }
}
