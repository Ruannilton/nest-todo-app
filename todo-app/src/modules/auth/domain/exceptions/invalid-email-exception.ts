import { DomainException } from '../../../../core/contracts/domain-exception';

export class InvalidEmailException extends DomainException {
  constructor(email: string) {
    super(
      `Invalid email address provided: "${email}". Please ensure it is correctly formatted.`,
    );
    this.name = 'InvalidEmailException';
  }
}
