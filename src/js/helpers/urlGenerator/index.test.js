import { urlGenerator } from '.';
import { urlValidation } from '../validation';

describe('urlGenerator', () => {
  test('it should return an erray of strings equal to number passed', () => {
    expect(urlGenerator(5)).toHaveLength(5);
  });

  test('it should return an erray of valid url strings', () => {
    const firstUrl = urlGenerator(5).[0];
    expect(urlValidation(firstUrl)).toEqual(true);
  });
});
