import knex from '../db/knex.js';
import { getErrorMessage } from '../utils';
import { Response } from '../types';

async function getCurrencies() {
  const response: Response = { isSuccess: true };
  try {
    response.data = await knex.select().from('currencies');
  } catch (err) {
    response.message = getErrorMessage(err);
    response.isSuccess = false;
  }

  return response;
}

export { getCurrencies };
