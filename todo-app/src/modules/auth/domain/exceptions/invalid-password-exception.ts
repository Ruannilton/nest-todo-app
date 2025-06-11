import { DomainException } from '../../../../core/contracts/domain-exception';

export class InvalidPasswordException extends DomainException {
  constructor() {
    super(
      'Invalid password provided. Please ensure your password meets the required criteria.',
    );
    this.name = 'InvalidPasswordException';
  }
}
