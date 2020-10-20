module.exports = {
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
};
