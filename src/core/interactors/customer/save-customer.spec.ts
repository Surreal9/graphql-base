import { rebindContainer, container } from '../../../../test/test-util';
import { SaveCustomerInteractor } from './save-customer';
import { TYPES } from '../../../app/container/constants';
import { CustomerType } from '../../entities/customer';
import { Container, decorate, injectable } from 'inversify';
import { CustomerDbGateway } from '../../../entity-gateways/customer-db-gateway';
import {
  CustomerGateway,
  SaveCustomerInteraction,
} from '../../../boundary/customer';
import { LoadCustomerByNameRequest } from '../../../boundary/requests/customers';
import {
  SaveCustomerGatewayResponse,
  LoadAllCustomerResponse,
  LoadCustomerByNameResponse,
  SaveCustomerResponse,
} from '../../../boundary/responses/customers';
import { mock, when, anything } from 'ts-mockito';
import { Mock } from 'ts-mocks';
import * as TypeMoq from 'typemoq';
import { KnexGateway } from '../../../entity-gateways/knex-gateway';

test('can save with a mock', async () => {
  const newCustomer: CustomerType = { name: 'test customer' };

  // create the mock
  const mockCustomerGateway: TypeMoq.IMock<
    CustomerDbGateway
  > = TypeMoq.Mock.ofType(CustomerDbGateway);

  // configure the mock to have an implementation fora method which returns a promise of an object
  mockCustomerGateway
    .setup(x => x.saveCustomer(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: newCustomer }));

  // pass our mock to the class we're testing (notice the .object)
  const saveCustomerInteractor = new SaveCustomerInteractor(
    mockCustomerGateway.object
  );

  const result = await saveCustomerInteractor.execute(newCustomer);

  // assert on both the method's return value
  expect(result).toEqual({ customer: newCustomer });

  // as well as the mock's function being called
  mockCustomerGateway.verify(
    x => x.saveCustomer(TypeMoq.It.isAny()),
    TypeMoq.Times.once()
  );
});

test('can save with a mock, injected', async () => {
  const newCustomer: CustomerType = { name: 'test customer' };

  // create the mock
  const mockCustomerGateway: TypeMoq.IMock<
    CustomerDbGateway
  > = TypeMoq.Mock.ofType(CustomerDbGateway);

  // configure the mock to have an implementation fora method which returns a promise of an object
  mockCustomerGateway
    .setup(x => x.saveCustomer(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: newCustomer }));

  // Configure our IoC container to return our mock
  rebindContainer(TYPES.CustomerGateway, mockCustomerGateway.object);

  // Use IoC to resolve our system under test
  const saveCustomerInteractor = container.get<SaveCustomerInteraction>(
    TYPES.SaveCustomerInteraction
  );

  const result = await saveCustomerInteractor.execute(newCustomer);

  // assert on both the method's return value
  expect(result).toEqual({ customer: newCustomer });

  // as well as the mock's function being called
  mockCustomerGateway.verify(
    x => x.saveCustomer(TypeMoq.It.isAny()),
    TypeMoq.Times.once()
  );
});
