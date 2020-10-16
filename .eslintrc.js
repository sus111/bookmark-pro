module.exports = {
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 6,
  },
  env: {
    browser: true,
    node: true,
  },
  parserOption: {
    sourceType: 'module',
  },
};
