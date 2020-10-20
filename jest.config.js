// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js}'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  testURL: 'http://localhost',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules'],
  verbose: false,
};
