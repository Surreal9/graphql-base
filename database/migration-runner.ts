import knex from './index';

export function runMigrations() {
  console.log('Checking for database migrations..');
  return knex.migrate
    .latest()
    .then((result: any) => {
      console.log('Ran', result[1].length, 'migration(s)');
      return knex.migrate.currentVersion();
    })
    .then((version: any) =>
      console.log('Current version of database: ', version)
    );
}
