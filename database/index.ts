const { env } = require('../config');

export const knexConfig = require('../knexfile')[env];

const knex = require('knex')(knexConfig);

export default knex;
