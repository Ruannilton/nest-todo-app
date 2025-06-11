import { ApplicationException } from 'src/core/contracts/application-exception';

export class EmailAlreadyExistsException extends ApplicationException {
  constructor(email: string) {
    super(
      `Email already exists: "${email}". Please use a different email address.`,
    );
    this.name = 'EmailAlreadyExistsException';
  }
}
