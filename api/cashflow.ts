// import knex from '../db/knex.js';
// import { getErrorMessage } from '../utils';
import type { Response, Props } from '../types';

async function create(props: Props): Promise<Response> {
  console.log('create props=>', props);

  return await Promise.resolve({ isSuccess: false });
}

export { create };
