exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('username', 20).notNullable();
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('password_digest').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
