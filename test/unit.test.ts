import first from 'lodash/first';
import unit from './fixtures/unit';
import { allKeysToCamelcase } from '@/utils';

test('allKeysToCamelcase', () => {
  const {
    allKeysToCamelcase: { actual, expected },
  } = unit;
  expect(allKeysToCamelcase(actual)).toEqual(expected);
  expect(allKeysToCamelcase(first(actual))).toEqual(first(expected));
});
