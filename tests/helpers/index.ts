import { first } from 'lodash';
import userFixtures from '../fixtures/user';
import budgetFixtures from '../fixtures/budget';
import type { AuthProps } from '@/types';
import knex from '@/db/knex';
import { login } from '@/api/auth';

// @ts-ignore
export const signIn = async (data: AuthProps = first(userFixtures.existing)) => {
  const { email } = data;
  await login({ email, password: 'seniorpomidor' });
};

export const prepareDB = async () => {
  await knex.migrate.latest();

  await knex('users').insert(userFixtures.existing);
  await knex('cashflows').insert(budgetFixtures.cashflow.existing);
  await knex('user_cashflow').insert({
    user_id: first(userFixtures.existing)?.id,
    cashflow_id: first(budgetFixtures.cashflow.existing)?.id,
  });
};

export const rollBackDb = async () => {
  await knex.migrate.rollback();
};
