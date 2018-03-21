import 'reflect-metadata';
import 'jest';
import knex from 'knex';
import { container, rebindContainer } from './test-util';
import { TYPES } from '../src/app/container/constants';
import { KnexGateway } from '../src/entity-gateways/knex-gateway';

let trx: knex.Transaction;

beforeEach(async () => {
  container.snapshot();
  const knexGateway = new KnexGateway();
  rebindContainer(TYPES.KnexGateway, knexGateway);
  trx = await knexGateway.startTransaction();
});

afterEach(async () => {
  await trx.rollback(new Error('rolling back trx'));
  container.restore();
});
