import knex from '../db/knex.js';
import { getErrorMessage } from '../utils';
import type { Response, ICashflowProp, Props } from '../types';

async function cashflow(props: ICashflowProp): Promise<Response> {
  const {
    action,
    profit,
    income,
    currency,
    monthAndYear,
    costs,
    user: { id: userId },
    cashflowId,
  } = props;
  try {
    switch (action) {
      case 'create':
        await knex.transaction(async (trx) => {
          const [cashflowId] = (await trx('cashflows')
            .returning('id')
            .insert({
              profit,
              income,
              currency: JSON.stringify(currency),
              costs: JSON.stringify(costs),
              for_date: monthAndYear,
            })) as any;
          await trx('user_cashflow').insert({ user_id: userId, cashflow_id: cashflowId });
        });
        break;
      case 'update':
        await knex('cashflows')
          .where({ id: cashflowId })
          .update({
            profit,
            income,
            currency: JSON.stringify(currency),
            costs: JSON.stringify(costs),
            for_date: monthAndYear,
          });
        break;
      default:
        throw new Error(`Action '${action}' is not allowed`);
    }
    return { isSuccess: true };
  } catch (err) {
    console.error(err);
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

async function fetchBudget({ user: { id } }: Props): Promise<Response> {
  console.log('fetchBudget', { id });
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
    if (!budgetData) return { isSuccess: true, data: null };
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

export { cashflow, fetchBudget };
