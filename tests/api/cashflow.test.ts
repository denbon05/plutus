import { first, omit } from 'lodash';
import userFixtures from '../fixtures/user';
import budgetFixtures from '../fixtures/budget';
import { prepareDB, rollBackDb, signIn } from '../helpers';
import knex from '@/db/knex';
import { cashflow } from '@/api/budget';

describe('cashflow api', () => {
  const { new: newCashflow, existing: existingCashflows } = budgetFixtures.cashflow;
  const { existing: existingUsers } = userFixtures;

  beforeEach(async () => {
    await prepareDB();
    await signIn();
  });

  afterEach(async () => {
    await rollBackDb();
  });

  test('create cashflow', async () => {
    const res = await cashflow({
      user: omit(first(existingUsers)),
      ...newCashflow,
      action: 'create',
    });
    expect(res).toEqual(
      expect.objectContaining({
        isSuccess: true,
      })
    );

    const [{ income, profit }] = await knex('cashflows').where({
      for_date: newCashflow.monthAndYear,
    });
    expect({ income, profit }).toEqual({
      income: newCashflow.income,
      profit: newCashflow.profit,
    });
  });

  test('update cashflow', async () => {
    const existedCashflow = first(existingCashflows);
    const res = await cashflow({
      user: omit(first(existingUsers)),
      ...newCashflow,
      action: 'update',
      cashflowId: existedCashflow?.id,
    });
    expect(res).toEqual(
      expect.objectContaining({
        isSuccess: true,
      })
    );

    // const [{ income, profit }] = await knex('cashflows').where({
    //   for_date: newCashflow.monthAndYear,
    // });
    // expect({ income, profit }).toEqual({
    //   income: newCashflow.income,
    //   profit: newCashflow.profit,
    // });
  });
});
