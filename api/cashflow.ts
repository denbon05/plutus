import knex from '../db/knex.js';
import { getErrorMessage } from '../utils';
import { IResponse } from '../types/api';

async function getCurrencies() {
  const response: IResponse = { isSuccess: true };
  try {
    response.data = await knex.select().from('currencies');
  } catch (err) {
    response.message = getErrorMessage(err);
    response.isSuccess = false;
  }

  return response;
}

export { getCurrencies };
