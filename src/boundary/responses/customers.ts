import { CustomerType } from '../../core/entities/customer';

export interface SaveCustomerResponse {
  customer: CustomerType;
}

export interface LoadAllCustomerResponse {
  customers: CustomerType[];
}

export interface LoadCustomerByNameResponse {
  customer: CustomerType;
}
