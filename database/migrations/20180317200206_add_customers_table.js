exports.up = knex =>
  knex.schema.createTable('customers', table => {
    table.string('name');
  });

exports.down = knex => knex.schema.dropTable('customers');
