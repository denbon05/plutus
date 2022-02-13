exports.up = function (knex) {
  return knex.schema.createTable('cashflow', (table) => {
    table.increments('id').primary();
    table.specificType('costs', 'jsonb[]').notNullable();
    table.date('for_date').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cashflow');
};
