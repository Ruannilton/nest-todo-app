import { ApplicationException } from '../../../../core/contracts/application-exception';

export class ResourceNotFoundException extends ApplicationException {
  constructor(resourceName: string, resourceId: string) {
    super(`Resource ${resourceName}`);
    this.cause = `Resource ${resourceName} with ID ${resourceId} not found`;
    this.name = 'ResourceNotFoundException';
  }
}
