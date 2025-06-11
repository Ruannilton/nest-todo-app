import { DomainException } from '../../../../core/contracts/domain-exception';

export class InvalidNameException extends DomainException {
  constructor(firstName: string, secondName: string) {
    super(
      `Invalid name: "${firstName} ${secondName}". Name must contain both first and last names.`,
    );
    this.name = 'InvalidNameException';
  }
}
