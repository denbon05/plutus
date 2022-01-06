exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('first_name', 20).notNullable();
    table.string('last_name', 20).notNullable();
    table.increments('id').primary();
    table.string('email').unique();
    table.string('password_digest').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
