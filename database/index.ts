import path from 'path';

const { env } = require('../config');

export const knexConfig = require('../knexfile')[env];

const knex = require('knex')(knexConfig);

export default knex;

export let startupPromise = Promise.resolve();
if (knexConfig.client === 'sqlite3') {
  console.log(path.join(__dirname, './seeds/development'));
  startupPromise = knex.migrate.latest().then(() =>
    knex.seed.run({
      directory: path.join(__dirname, './seeds/development'),
    })
  );
}
