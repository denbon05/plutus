import { decode, sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import knex from '../db/knex.js';
import { value2Hash, getErrorMessage } from '../utils';
import type { Response, UserDataProps } from '../types';

config();

const jwtKey = (process.env.JWT_KEY as string) ?? 'secret';

interface IAuthResponse extends Response {
  accessToken?: string;
  id?: number;
}

async function register({ name, password, email }: UserDataProps): Promise<IAuthResponse> {
  try {
    const [userData] = (await knex('users')
      .returning(['id', 'name'])
      .insert({
        name,
        email,
        password_digest: value2Hash(password),
      })) as any;
    return { isSuccess: true, accessToken: sign(userData, jwtKey) };
  } catch (err) {
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

function fetchUserData({ token }: { token: string }): IAuthResponse {
  try {
    const decoded = decode(token);
    return { data: decoded, isSuccess: true };
  } catch (err) {
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

async function login(props: { email: string; password: string }): Promise<IAuthResponse> {
  try {
    const { email, password } = props;
    const [userData] = await knex('users')
      .select(['id', 'name'])
      .where({ email, password_digest: value2Hash(password) });
    return { isSuccess: true, accessToken: sign(userData, jwtKey) };
  } catch (err) {
    return { isSuccess: false, message: getErrorMessage(err) };
  }
}

// eslint-disable-next-line require-await
async function refresh(props: any) {
  console.log('refresh props=>', props);

  return { isSuccess: false };
}

export { register, refresh, login, fetchUserData };
