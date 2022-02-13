import userData from './fixtures/user';
import { prepareDB, rollBackDb } from './helpers';
import { register } from '@/api/auth';
import { create } from '@/api/cashflow';

describe('cashflow api', () => {
  let knex;

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    knex = await prepareDB();
    await register(userData.new);
  });

  beforeEach(async () => {});

  afterAll(async () => {
    await rollBackDb();
  });

  test('create cashflow', async () => {
    const res = await create({ user: { id: 1 } });
    expect(res).toEqual(
      expect.objectContaining({
        isSuccess: false,
      })
    );
  });
});
