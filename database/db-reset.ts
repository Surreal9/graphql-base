import { wipeDb } from './db-wiper';
import { env } from '../config';
import { runMigrations } from './migration-runner';
import knex from './index';
import path from 'path';

console.log('Resetting db, environment', env);

// Drop all tables, run migrations, then seed
export function reset() {
  console.log('reset!');
  return wipeDb()
    .then(runMigrations)
    .then(() =>
      knex.seed.run({
        directory: path.join(__dirname, './seeds/development'),
      })
    );
}

// If run from the CLI, close the db connection after reset to allow the process to terminate
export function resetFromCLI() {
  reset().then(() => knex.destroy());
}
