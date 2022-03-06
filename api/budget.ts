import knex from '../db/knex.js';
import { getErrorMessage } from '../utils';
import type { Response, ICashflowProp, Props } from '../types';

async function createCashflow(props: ICashflowProp): Promise<Response> {
  const {
    cashflow,
    income,
    currency,
    monthAndYear,
    costs,
    user: { id: userId },
  } = props;
  try {
    await knex.transaction(async (trx) => {
      const [cashflowId] = (await trx('cashflows')
        .returning('id')
        .insert({
          cashflow,
          income,
          currency: JSON.stringify(currency),
          costs: JSON.stringify(costs),
          for_date: monthAndYear,
        })) as any;
      console.log('cashflowId=>', cashflowId);
      await trx('user_cashflow').insert({ user_id: userId, cashflow_id: cashflowId });
    });
  } catch (err) {
    console.error(err);
    return { isSuccess: false, message: getErrorMessage(err) };
  }
  return await Promise.resolve({ isSuccess: false });
}

async function fetchBudget({ user: { id } }: Props): Promise<Response> {
  try {
    const [budgetData] = await knex.raw(`
      SELECT
        * 
      FROM
        cashflows c 
        LEFT JOIN
          user_cashflow uc 
          ON c.id = uc.cashflow_id 
      WHERE
        uc.user_id = ${id};
    `);
    return {
      isSuccess: true,
      data: {
        ...budgetData,
        costs: JSON.parse(budgetData.costs),
        currency: JSON.parse(budgetData.costs),
      },
    };
  } catch (err) {
    console.error(err);
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

export { createCashflow, fetchBudget };
