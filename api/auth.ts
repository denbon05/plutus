/* eslint-disable require-await */
import knex from '../db/knex.js';
import { value2Hash } from '../utils';
import type { Response, UserDataProps } from '../types/api.js';

async function register({ username, password, email }: UserDataProps): Promise<Response> {
  console.log('register props=>', { username, password, email });
  try {
    await knex('users').insert({
      username,
      email,
      password_digest: value2Hash(password),
    });
  } catch (err) {
    console.log('register err', err);
    return { isSuccess: false };
  }

  return { isSuccess: true };
}

async function user(props: any) {
  console.log('user props', props);
  return { isSuccess: false };
}

async function refresh(props: any) {
  console.log('refresh props=>', props);

  return { succes: true };
}

async function logout(props: any) {
  console.log('logout props=>', props);

  return { succes: true };
}

export { register, refresh, logout, user };
