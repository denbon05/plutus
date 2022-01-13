exports.up = function (knex) {
  return knex.schema.createTable('currencies', (table) => {
    table.increments('id').primary();
    table.string('symbol', 9).notNullable();
    table.string('currency', 3).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('currencies');
};
