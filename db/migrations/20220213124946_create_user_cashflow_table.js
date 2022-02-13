exports.up = function (knex) {
  return knex.schema.createTable('user_cashflow', (table) => {
    table.integer('user_id').references('id').inTable('users');
    table.integer('cashflow_id').references('id').inTable('cashflow');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_cashflow');
};
