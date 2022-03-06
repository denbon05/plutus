import { createHash } from 'crypto';
import { isArray, isObject, keys, camelCase } from 'lodash';

const formatError = (error: string): string => {
  if (error.match(/unique\sconstraint.*email/gi)) return 'User is already exist with this email';
  return error;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return formatError(error.message);
  return formatError(String(error));
};

export const isCanStartUser = (): boolean => false;

export const value2Hash = (value: string): string =>
  createHash('sha256').update(value).digest('hex');

export const allKeysToCamelcase = (item: any): any => {
  if (isArray(item)) return item.map((n) => (isObject(n) ? allKeysToCamelcase(n) : n));
  if (isObject(item))
    return keys(item).reduce((acc, key) => {
      // @ts-ignore
      const value = item[key];
      return {
        ...acc,
        [camelCase(key)]: isObject(value) ? allKeysToCamelcase(value) : value,
      };
    }, {});
};
