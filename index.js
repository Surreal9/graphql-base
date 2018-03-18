const knex = require('knex');
const { assign } = require('lodash');
const { run } = require('./src');

run(assign(process.env, { db: { handle: knex } }));
