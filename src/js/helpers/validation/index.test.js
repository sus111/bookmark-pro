import { urlValidation } from '.';

describe('validation', () => {
  const validUrls = [
    'http://www.website.com',
    'https://www.website.com',
    'www.website.com',
    'www.website.co.uk',
    'www.website.fr',
    'website.com',
  ];

  test('it should return true for valid urls', () => {
    validUrls.forEach((validUrl) => {
      expect(urlValidation(validUrl)).toEqual(true);
    });
  });

  const invalidUrls = [
    'website',
    'www.website',
    '',
  ];

  test('it should return false for invalid urls', () => {
    invalidUrls.forEach((invalidUrl) => {
      expect(urlValidation(invalidUrl)).toEqual(false);
    });
  });
});
