import {
  SaveCustomerRequest,
  LoadCustomerByNameRequest,
} from './requests/customers';
import {
  SaveCustomerResponse,
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
} from './responses/customers';

export interface CustomerApi {
  saveCustomer(request: SaveCustomerRequest): Promise<SaveCustomerResponse>;
  loadAllCustomers(): Promise<LoadAllCustomerResponse>;
  loadCustomerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse>;
}

export interface CustomerGateway {
  saveCustomer(request: SaveCustomerRequest): Promise<SaveCustomerResponse>;
  loadAllCustomers(): Promise<LoadAllCustomerResponse>;
  loadCustomerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse>;
}
