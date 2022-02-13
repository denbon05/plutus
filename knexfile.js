// @ts-check

const path = require('path');
const dotenv = require('dotenv');
const { allKeysToCamelcase } = require('./utils');

dotenv.config();

const defaultOptions = {
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'db', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'db', 'seeds'),
  },
  // @ts-ignore
  postProcessResponse: (result) => allKeysToCamelcase(result),
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite',
    },
    ...defaultOptions,
  },

  test: {
    client: 'sqlite3',
    connection: ':memory:',
    ...defaultOptions,
  },

  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    ...defaultOptions,
  },
};
