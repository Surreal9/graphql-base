// const knexCleaner = require('knex-cleaner');
// const casual = require('casual');
import knex from '../../';
// import { values } from 'lodash';
console.log('seed!');
const customers = [{ name: 'Joe' }, { name: 'Frank' }];

export function seed() {
  return knex('customers').insert(customers);
}
