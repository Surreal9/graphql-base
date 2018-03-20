import { CustomerType } from '../../core/entities/customer';

export interface SaveCustomerResponse {
  customer: CustomerType;
  error?: SaveCustomerResponseError;
}

export interface SaveCustomerGatewayResponse {
  customer: CustomerType;
}

export enum SaveCustomerResponseError {
  INVALID_NAME = 'INVALID_NAME',
}

export interface LoadAllCustomerResponse {
  customers: CustomerType[];
}

export interface LoadCustomerByNameResponse {
  customer: CustomerType;
}
