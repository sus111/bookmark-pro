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
  overrides: [
    {
      files: [
        '**/*.test.js',
      ],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
};
