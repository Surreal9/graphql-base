import container from '../app/container/container.config';
import { TYPES } from '../app/container/constants';
import { CustomerDbGateway } from './customer-db-gateway';

test('can load a customer', async () => {
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
