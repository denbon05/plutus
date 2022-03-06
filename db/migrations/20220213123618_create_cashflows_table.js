exports.up = function (knex) {
  return knex.schema.createTable('cashflows', (table) => {
    table.increments('id').primary();
    table.integer('cashflow').notNullable();
    table.integer('income').notNullable();
    table.specificType('currency', 'jsonb').notNullable();
    table.specificType('costs', 'jsonb[]').notNullable();
    table.date('for_date').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cashflows');
};
