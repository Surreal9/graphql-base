import { injectable, inject } from 'inversify';
import { TYPES } from '../../../app/container/constants';
import { SaveCustomerRequest } from '../../../boundary/requests/customers';
import { SaveCustomerResponse } from '../../../boundary/responses/customers';
import {
  CustomerGateway,
  SaveCustomerInteraction,
} from '../../../boundary/customer';
import { validate } from '../../entities/customer';

@injectable()
export class SaveCustomerInteractor implements SaveCustomerInteraction {
  private customerGateway: CustomerGateway;

  constructor(@inject(TYPES.CustomerGateway) customerGateway: CustomerGateway) {
    this.customerGateway = customerGateway;
  }

  public async execute(
    request: SaveCustomerRequest
  ): Promise<SaveCustomerResponse> {
    const error = await validate(request, this.customerGateway);

    if (error) {
      return {
        customer: null,
        error,
      };
    }

    return this.customerGateway
      .saveCustomer(request)
      .then(({ customer }) => ({ customer, error }));
  }
}
