import { rebindContainer, container } from '../../../../test/test-util';
import { SaveCustomerInteractor } from './save-customer';
import { TYPES } from '../../../app/container/constants';
import { CustomerType } from '../../entities/customer';
import { Container, decorate, injectable } from 'inversify';
import { CustomerDbGateway } from '../../../gateways/customer-db-gateway';
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
  SaveCustomerResponseError,
} from '../../../boundary/responses/customers';
import { mock, when, anything } from 'ts-mockito';
import { Mock } from 'ts-mocks';
import * as TypeMoq from 'typemoq';
import { KnexGateway } from '../../../gateways/knex-gateway';

test('can save with a mock', async () => {
  const newCustomer: CustomerType = { name: 'test customer' };

  // create the mock
  const mockCustomerGateway: TypeMoq.IMock<
    CustomerDbGateway
  > = TypeMoq.Mock.ofType(CustomerDbGateway);

  // configure the mock to have an implementation fora method which returns a promise of an object
  mockCustomerGateway
    .setup(x => x.saveCustomer(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: newCustomer, error: null }));

  mockCustomerGateway
    .setup(x => x.loadCustomerByName(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: null }));

  // pass our mock to the class we're testing (notice the .object)
  const saveCustomerInteractor = new SaveCustomerInteractor(
    mockCustomerGateway.object
  );

  const result = await saveCustomerInteractor.execute(newCustomer);

  // assert on both the method's return value
  expect(result).toEqual({ customer: newCustomer, error: null });

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

  // configure the mock to have an implementation for a method which returns a promise of an object
  mockCustomerGateway
    .setup(x => x.saveCustomer(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: newCustomer, error: null }));

  mockCustomerGateway
    .setup(x => x.loadCustomerByName(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: null }));

  // Configure our IoC container to return our mock
  rebindContainer(TYPES.CustomerGateway, mockCustomerGateway.object);

  // Use IoC to resolve our system under test
  const saveCustomerInteractor = container.get<SaveCustomerInteraction>(
    TYPES.SaveCustomerInteraction
  );

  const result = await saveCustomerInteractor.execute(newCustomer);

  // assert on both the method's return value
  expect(result).toEqual({ customer: newCustomer, error: null });

  // as well as the mock's function being called
  mockCustomerGateway.verify(
    x => x.saveCustomer(TypeMoq.It.isAny()),
    TypeMoq.Times.once()
  );
});

test('validate saveCustomer against duplicate name', async () => {
  const newCustomer: CustomerType = { name: 'Joe' };

  // Ask IoC container for a new gateway that we can partially mock
  // This is done so that the db dependency is injected along with it
  const realGateway = container.get<CustomerDbGateway>(TYPES.CustomerGateway);

  // create the mock
  const mockCustomerGateway: TypeMoq.IMock<
    CustomerDbGateway
  > = TypeMoq.Mock.ofInstance(realGateway);

  // configure the mock to have an implementation for a method which returns a promise of an object
  mockCustomerGateway
    .setup(x => x.saveCustomer(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: newCustomer }));

  // enable the base object to work for non-mocked methods
  mockCustomerGateway.callBase = true;

  // Configure our IoC container to return our mock
  rebindContainer(TYPES.CustomerGateway, mockCustomerGateway.object);

  // Use IoC to resolve our system under test
  const saveCustomerInteractor = container.get<SaveCustomerInteraction>(
    TYPES.SaveCustomerInteraction
  );

  const result = await saveCustomerInteractor.execute(newCustomer);

  // assert on both the method's return value
  expect(result).toEqual({
    customer: null,
    error: SaveCustomerResponseError.DUPLICATE_NAME,
  });

  // as well as the mock's save function not being called
  mockCustomerGateway.verify(
    x => x.saveCustomer(TypeMoq.It.isAny()),
    TypeMoq.Times.never()
  );
});

test('validate saveCustomer against empty name', async () => {
  const newCustomer: CustomerType = { name: '' };

  // Ask IoC container for a new gateway that we can partially mock
  // This is done so that the db dependency is injected along with it
  const realGateway = container.get<CustomerDbGateway>(TYPES.CustomerGateway);

  // create the mock
  const mockCustomerGateway: TypeMoq.IMock<
    CustomerDbGateway
  > = TypeMoq.Mock.ofInstance(realGateway);

  // configure the mock to have an implementation for a method which returns a promise of an object
  mockCustomerGateway
    .setup(x => x.saveCustomer(TypeMoq.It.isAny()))
    .returns(() => Promise.resolve({ customer: newCustomer }));

  // enable the base object to work for non-mocked methods
  mockCustomerGateway.callBase = true;

  // Configure our IoC container to return our mock
  rebindContainer(TYPES.CustomerGateway, mockCustomerGateway.object);

  // Use IoC to resolve our system under test
  const saveCustomerInteractor = container.get<SaveCustomerInteraction>(
    TYPES.SaveCustomerInteraction
  );

  const result = await saveCustomerInteractor.execute(newCustomer);

  // assert on both the method's return value
  expect(result).toEqual({
    customer: null,
    error: SaveCustomerResponseError.INVALID_NAME,
  });

  // as well as the mock's function not being called
  mockCustomerGateway.verify(
    x => x.saveCustomer(TypeMoq.It.isAny()),
    TypeMoq.Times.never()
  );
});
