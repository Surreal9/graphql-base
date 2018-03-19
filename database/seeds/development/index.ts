const knexCleaner = require('knex-cleaner');
import knex from '../../index';
import { customers } from '../../../test/fixtures/customers';

export function seed() {
  return knexCleaner
    .clean(knex, {
      ignoreTables: ['migrations', 'migrations_lock', 'spatial_ref_sys'],
    })
    .then(() => knex('customers').insert(customers));
}
