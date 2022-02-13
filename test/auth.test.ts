import userData from './fixtures/user';
import { prepareDB, rollBackDb } from './helpers';
import { register, login } from '@/api/auth';

describe('auth proccess api', () => {
  beforeAll(async () => {
    await prepareDB();
  });

  beforeEach(async () => {
    await register(userData.new);
  });

  afterAll(async () => {
    await rollBackDb();
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
