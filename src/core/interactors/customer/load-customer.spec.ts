import container from '../../../app/container/container.config';
import { TYPES } from '../../../app/container/constants';
import { LoadCustomerInteractor } from './load-customer';

test('can load a customer', async () => {
  const loadCustomer = container.get<LoadCustomerInteractor>(
    TYPES.LoadCustomerInteraction
  );
  const { customers } = await loadCustomer.allCustomers();
  console.log(customers);
  expect(customers.length).toBeGreaterThan(0);
});

test('can load a customer by name', async () => {
  const loadCustomer = container.get<LoadCustomerInteractor>(
    TYPES.LoadCustomerInteraction
  );
  const { customer } = await loadCustomer.customerByName({ name: 'Frank' });
  expect(customer).toEqual({ name: 'Frank' });
});
