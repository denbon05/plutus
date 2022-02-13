import { createHash } from 'crypto';
// eslint-disable-next-line import/named
import { isArray, isObject, keys, camelCase } from 'lodash';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
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
