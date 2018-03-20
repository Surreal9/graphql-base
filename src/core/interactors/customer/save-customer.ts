import { injectable, inject } from 'inversify';
import { TYPES } from '../../../app/container/constants';
import { SaveCustomerRequest } from '../../../boundary/requests/customers';
import { SaveCustomerResponse } from '../../../boundary/responses/customers';
import { CustomerGateway } from '../../../boundary/customer';

@injectable()
export class SaveCustomerInteractor {
  private customerGateway: CustomerGateway;

  constructor(@inject(TYPES.CustomerGateway) customerGateway: CustomerGateway) {
    this.customerGateway = customerGateway;
  }

  public execute(request: SaveCustomerRequest): Promise<SaveCustomerResponse> {
    const error = undefined;

    return this.customerGateway
      .saveCustomer(request)
      .then(({ customer }) => ({ customer, error }));
  }
}
