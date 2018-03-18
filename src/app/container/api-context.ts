import { TYPES } from './../container/constants';
import { CustomerApi } from './../../boundary/customer';
import { injectable, inject } from 'inversify';
import { LoadCustomerInteractor } from '../../core/interactors/customer/load-customer';
import { SaveCustomerInteractor } from '../../core/interactors/customer/save-customer';
import {
  SaveCustomerRequest,
  LoadCustomerByNameRequest,
} from '../../boundary/requests/customers';
import {
  SaveCustomerResponse,
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
} from '../../boundary/responses/customers';

@injectable()
export class ApiContext {
  @inject(TYPES.CustomerApi) public customer!: CustomerApi;
}

@injectable()
export class CustomerApiContext implements CustomerApi {
  @inject(TYPES.LoadCustomerInteractor)
  private loadCustomerInteractor!: LoadCustomerInteractor;

  @inject(TYPES.LoadCustomerInteractor)
  private saveCustomerInteractor!: SaveCustomerInteractor;

  public saveCustomer(
    request: SaveCustomerRequest
  ): Promise<SaveCustomerResponse> {
    return this.saveCustomerInteractor.execute(request);
  }

  public loadAllCustomers(): Promise<LoadAllCustomerResponse> {
    return this.loadCustomerInteractor.allCustomers();
  }

  public loadCustomerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse> {
    return this.loadCustomerInteractor.customerByName(request);
  }
}
