const path = require('path');
const dotenv = require('dotenv');
const { isArray, isObject, keys, camelCase } = require('lodash');

dotenv.config();

const allKeysToCamelcase = (item) => {
  if (isArray(item)) return item.map((n) => (isObject(n) ? allKeysToCamelcase(n) : n));
  if (isObject(item))
    return keys(item).reduce((acc, key) => {
      const value = item[key];
      return {
        ...acc,
        [camelCase(key)]: isObject(value) ? allKeysToCamelcase(value) : value,
      };
    }, {});
};

const defaultOptions = {
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, 'db', 'migrations'),
  },
  seeds: {
    directory: path.join(__dirname, 'db', 'seeds'),
  },
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
    // debug: process.env.IS_LOCAL_ENV,
  },

  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    ...defaultOptions,
  },
};
