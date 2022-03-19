import first from 'lodash/first';
import unit from './fixtures/unit';
import { test as testConfig } from '@/knexfile';

test('allKeysToCamelcase', () => {
  const {
    allKeysToCamelcase: { actual, expected },
  } = unit;
  const allKeysToCamelcase = testConfig.postProcessResponse;

  expect(allKeysToCamelcase(actual)).toEqual(expected);
  expect(allKeysToCamelcase(first(actual))).toEqual(first(expected));
});
