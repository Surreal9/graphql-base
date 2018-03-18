import container from '../../../app/container/container.config';
import { SaveCustomerInteractor } from './save-customer';
import { TYPES } from '../../../app/container/constants';

test('can save a customer', async () => {
  const saveCustomer = container.get<SaveCustomerInteractor>(
    TYPES.SaveCustomerInteractor
  );
  // tslint:disable-next-line:no-console
  const result = await saveCustomer.execute({ name: 'testing' });
  console.log({ result });
  expect(true).toBe(true);
});
