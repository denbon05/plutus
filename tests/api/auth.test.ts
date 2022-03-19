import { omit } from 'lodash';
import userFixtures from '../fixtures/user';
import { prepareDB, rollBackDb } from '../helpers';
import knex from '@/db/knex';
import { register, login } from '@/api/auth';

describe('auth proccess api', () => {
  const { new: newUserData } = userFixtures;

  beforeAll(async () => {
    await prepareDB();
  });

  beforeEach(async () => {
    await register(newUserData);
  });

  afterEach(async () => {
    await rollBackDb();
  });

  test('signIn', async () => {
    const res = await login(newUserData);
    expect(res).toEqual(
      expect.objectContaining({
        isSuccess: true,
      })
    );

    const [actualUserData] = await knex('users').where({
      email: newUserData.email,
    });
    expect(omit(actualUserData, ['passwordDigest', 'id'])).toEqual(omit(newUserData, 'password'));
  });
});
