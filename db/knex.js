// eslint-disable-next-line import/no-named-as-default
import knex from 'knex';
import knexConfig from '../knexfile';

const mode = process.env.NODE_ENV || 'development';

export default knex(knexConfig[mode]);
