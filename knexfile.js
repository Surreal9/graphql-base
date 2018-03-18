const { database } = require('./config');

module.exports = {
  development: {
    client: 'sqlite3',
    debug: false, // set true to log all queries
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: ':memory:',
    useNullAsDefault: true,
  },
  localtest: {
    client: 'sqlite3',
    debug: false, // set true to log all queries
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: ':memory:',
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    debug: false, // set true to log all queries
    migrations: {
      directory: './database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './database/seeds/development',
    },
    connection: ':memory:',
    useNullAsDefault: true,
  },
};
