exports.up = function (knex) {
  return knex.schema.createTable('user_cashflow', (table) => {
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('cashflow_id').references('id').inTable('cashflows').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_cashflow');
};
