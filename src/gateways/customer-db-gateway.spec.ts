import { container } from '../../test/test-util';
import { TYPES } from '../app/container/constants';
import { CustomerDbGateway } from './customer-db-gateway';
import { KnexGateway } from './knex-gateway';

test('can load all customers', async () => {
  const loadCustomer = container.get<CustomerDbGateway>(
    TYPES.LoadCustomerInteraction
  );
  const { customers } = await loadCustomer.loadAllCustomers();
  expect(customers.length).toBeGreaterThan(1);
});

test('can load a customer by name', async () => {
  const loadCustomer = container.get<CustomerDbGateway>(
    TYPES.LoadCustomerInteraction
  );
  const { customer } = await loadCustomer.loadCustomerByName({ name: 'Frank' });
  expect(customer).toEqual({ name: 'Frank' });
});

test('can save a customer, which can be loaded after', async () => {
  const knexGateway = container.get<KnexGateway>(TYPES.KnexGateway);
  const gateway = new CustomerDbGateway(knexGateway);
  const newCustomer = { name: 'Jimmy2' };
  const { customer } = await gateway.saveCustomer(newCustomer);
  const { customer: loadCustomerResult } = await gateway.loadCustomerByName({
    name: 'Jimmy2',
  });
  expect(customer).toEqual(newCustomer);
  expect(loadCustomerResult).toEqual(newCustomer);
});
