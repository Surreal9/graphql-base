import { first } from 'lodash';
import { TYPES } from './../app/container/constants';
import {
  SaveCustomerRequest,
  LoadCustomerByNameRequest,
} from './../boundary/requests/customers';
import { CustomerGateway } from './../boundary/customer';
import {
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
  SaveCustomerGatewayResponse,
} from '../boundary/responses/customers';
import { injectable, inject } from 'inversify';
import { KnexGateway } from './knex-gateway';
import { CustomerType } from '../core/entities/customer';

@injectable()
export class CustomerDbGateway implements CustomerGateway {
  private knexGateway!: KnexGateway;

  public constructor(@inject(TYPES.KnexGateway) knexGateway: KnexGateway) {
    this.knexGateway = knexGateway;
  }

  public async saveCustomer(
    request: SaveCustomerRequest
  ): Promise<SaveCustomerGatewayResponse> {
    const qb = this.knexGateway.getBuilder('customers');
    await qb.insert(request);
    return { customer: request };
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
