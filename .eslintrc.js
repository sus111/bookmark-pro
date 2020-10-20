module.exports = {
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    'no-invalid-this': 0,
    indent: 0,
    'object-curly-spacing': 0,
    'quote-props': 0,
    'operator-linebreak': 0,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'google'],
  env: {
    browser: true,
    node: true,
  },
};
