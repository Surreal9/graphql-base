import container from '../../../app/container/container.config';
import { TYPES } from '../../../app/container/constants';
import { LoadCustomerInteractor } from './load-customer';

test('can load a customer', async () => {
  const loadCustomer = container.get<LoadCustomerInteractor>(
    TYPES.LoadCustomerInteractor
  );
  const { customers } = await loadCustomer.allCustomers();
  expect(customers.length).toBeGreaterThan(1);
});

test('can load a customer by name', async () => {
  const loadCustomer = container.get<LoadCustomerInteractor>(
    TYPES.LoadCustomerInteractor
  );
  const { customer } = await loadCustomer.customerByName({ name: 'Frank' });
  expect(customer).toEqual({ name: 'Frank' });
});
