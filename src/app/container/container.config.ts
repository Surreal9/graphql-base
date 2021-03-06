import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import {
  CustomerGateway,
  LoadCustomerInteraction,
  SaveCustomerInteraction,
} from './../../boundary/customer';
import { CustomerDbGateway } from '../../gateways/customer-db-gateway';
import { TYPES } from './constants';
import { SaveCustomerInteractor } from '../../core/interactors/customer/save-customer';
import { KnexGateway } from '../../gateways/knex-gateway';
import { ApiContext, CustomerApiContext } from './api-context';
import { CustomerApi } from '../../boundary/customer';

export const config = new ContainerModule(bind => {
  bind<CustomerGateway>(TYPES.CustomerGateway).to(CustomerDbGateway);
  bind<SaveCustomerInteraction>(TYPES.SaveCustomerInteraction).to(
    SaveCustomerInteractor
  );
  bind<LoadCustomerInteraction>(TYPES.LoadCustomerInteraction).to(
    CustomerDbGateway
  );
  bind<KnexGateway>(TYPES.KnexGateway)
    .to(KnexGateway)
    .inRequestScope();
  bind<ApiContext>(TYPES.ApiContext).to(ApiContext);
  bind<CustomerApi>(TYPES.CustomerApi).to(CustomerApiContext);
});

export const container = new Container();
container.load(config);

export default container;
