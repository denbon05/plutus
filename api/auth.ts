/* eslint-disable require-await */
import { sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import knex from '../db/knex.js';
import { value2Hash, getErrorMessage } from '../utils';
import type { Response, UserDataProps } from '../types';

config();

const jwtKey = process.env.JWT_KEY as string;

interface IAuthResponse extends Response {
  accessToken?: string;
  id?: number;
}

async function register({ username, password, email }: UserDataProps): Promise<IAuthResponse> {
  console.log('register props=>', { username, password, email });
  try {
    const [id] = await knex('users')
      .returning('id')
      .insert({
        username,
        email,
        password_digest: value2Hash(password),
      });
    return { isSuccess: true, accessToken: sign({ id }, jwtKey), id };
  } catch (err) {
    console.log('register err', getErrorMessage(err));
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

async function fetchUserData({ id }: { id: number }): Promise<IAuthResponse> {
  console.log('user props', { id });
  try {
    const [data] = await knex('users').select('username', 'id').where('id', id);
    console.log('fetchUserData data=>', data);
    return { data, isSuccess: true };
  } catch (err) {
    console.log('fetchUserData err:', err);
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

async function refresh(props: any) {
  console.log('refresh props=>', props);

  return { isSuccess: false };
}

async function logout(props: any) {
  console.log('logout props=>', props);

  return { isSuccess: false };
}

export { register, refresh, logout, fetchUserData };
