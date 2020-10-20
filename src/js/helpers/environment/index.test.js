import { isDev } from '.';

describe('isDev', () => {
  test('it should be false in test env', () => {
    expect(isDev()).toEqual(false);
  });

  const currentEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...currentEnv };
  });

  afterAll(() => {
    process.env = currentEnv;
  });

  test('it should be true', () => {
    process.env.NODE_ENV = 'development';
    expect(isDev()).toEqual(true);
  });
});
