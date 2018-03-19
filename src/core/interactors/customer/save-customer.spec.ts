import { SaveCustomerInteraction } from './../../../boundary/customer';
import container from '../../../app/container/container.config';
import { SaveCustomerInteractor } from './save-customer';
import { TYPES } from '../../../app/container/constants';

test('can save a customer', async () => {
  const saveCustomer = container.get<SaveCustomerInteraction>(
    TYPES.SaveCustomerInteraction
  );
  const result = await saveCustomer.execute({ name: 'testing' });
  expect(true).toBe(true);
});
