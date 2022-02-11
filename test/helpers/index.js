import knex from '@/db/knex';

export const prepareDB = async () => {
  const knexInstance = await knex.migrate.latest();
  return knexInstance;
};

export const resetDb = async () => {
  await knex.migrate.rollback();
};
