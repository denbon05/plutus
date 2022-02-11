import userData from './fixtures/user';
import { prepareDB, resetDb } from './helpers';
import { register, login } from '@/api/auth';

describe('auth proccess', () => {
  let knex;

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    knex = await prepareDB();
  });

  beforeEach(async () => {
    await register(userData.new);
  });

  afterAll(async () => {
    await resetDb();
  });

  test('signIn', async () => {
    const res = await login(userData.new);
    expect(res).toEqual(
      expect.objectContaining({
        isSuccess: true,
      })
    );
  });
});
