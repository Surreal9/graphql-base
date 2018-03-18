import { injectable, inject } from 'inversify';
import { TYPES } from '../../../app/container/constants';
import {
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
} from '../../../boundary/responses/customers';
import { CustomerGateway } from '../../../boundary/customer';
import { LoadCustomerByNameRequest } from '../../../boundary/requests/customers';

@injectable()
export class LoadCustomerInteractor {
  private customerGateway: CustomerGateway;

  constructor(@inject(TYPES.CustomerGateway) customerGateway: CustomerGateway) {
    this.customerGateway = customerGateway;
  }

  public allCustomers(): Promise<LoadAllCustomerResponse> {
    return this.customerGateway.loadAllCustomers();
  }

  public customerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse> {
    return this.customerGateway.loadCustomerByName(request);
  }
}
