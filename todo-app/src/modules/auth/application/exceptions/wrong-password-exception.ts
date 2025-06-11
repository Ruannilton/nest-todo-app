import { ApplicationException } from '../../../../core/contracts/application-exception';

export class WrongPasswordException extends ApplicationException {
  constructor() {
    super(
      'Invalid password provided. Please ensure your password meets the required criteria.',
    );
    this.name = 'InvalidPasswordException';
  }
}
