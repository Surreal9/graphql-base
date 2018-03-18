import { first } from 'lodash';
import { TYPES } from './../app/container/constants';
import { SaveCustomerRequest } from './../boundary/requests/customers';
import { CustomerGateway } from './../boundary/customer';
import {
  SaveCustomerResponse,
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
} from '../boundary/responses/customers';
import { injectable, inject } from 'inversify';
import { KnexGateway } from './knex-gateway';
import { LoadCustomerByNameRequest } from '../boundary/requests/customers';
import { CustomerType } from '../core/entities/customer';

@injectable()
export class CustomerDbGateway implements CustomerGateway {
  @inject(TYPES.KnexGateway) private knexGateway!: KnexGateway;

  public async saveCustomer(
    request: SaveCustomerRequest
  ): Promise<SaveCustomerResponse> {
    // const qb = this.knexGateway.getBuilder('customers');
    // const customers = await qb;
    const response: Promise<SaveCustomerResponse> = Promise.resolve({
      customer: { name: request.name },
    });
    return response;
  }

  public async loadAllCustomers(): Promise<LoadAllCustomerResponse> {
    return this.knexGateway
      .getBuilder('customers')
      .then(data => ({ customers: data }));
  }

  public async loadCustomerByName(
    request: LoadCustomerByNameRequest
  ): Promise<LoadCustomerByNameResponse> {
    return this.knexGateway
      .getBuilder('customers')
      .where('name', request.name)
      .then(data => ({
        customer: (first(data) || null) as CustomerType,
      }));
  }
}
