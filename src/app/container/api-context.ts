import { TYPES } from './../container/constants';
import {
  CustomerApi,
  LoadCustomerInteraction,
  SaveCustomerInteraction,
} from './../../boundary/customer';
import { injectable, inject } from 'inversify';

@injectable()
export class ApiContext {
  @inject(TYPES.CustomerApi) public customer!: CustomerApi;
}

@injectable()
export class CustomerApiContext implements CustomerApi {
  @inject(TYPES.LoadCustomerInteraction) public load!: LoadCustomerInteraction;
  @inject(TYPES.SaveCustomerInteraction) public save!: SaveCustomerInteraction;
}
