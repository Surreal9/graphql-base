import {
  SaveCustomerRequest,
  LoadCustomerByNameRequest,
} from './requests/customers';
import {
  SaveCustomerResponse,
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
  SaveCustomerGatewayResponse,
} from './responses/customers';

export interface CustomerApi {
  load: LoadCustomerInteraction;
  save: SaveCustomerInteraction;
}

export interface SaveCustomerInteraction {
  execute(request: SaveCustomerRequest): Promise<SaveCustomerResponse>;
}

export interface LoadCustomerInteraction {
  allCustomers(): Promise<LoadAllCustomerResponse>;
  customerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse>;
}

export interface CustomerGateway {
  saveCustomer(
    request: SaveCustomerRequest
  ): Promise<SaveCustomerGatewayResponse>;
  loadAllCustomers(): Promise<LoadAllCustomerResponse>;
  loadCustomerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse>;
}
