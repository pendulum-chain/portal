module.exports = {
  roots: ['<rootDir>/src'],
  maxWorkers: 1,
  transform: {
    '\\.(ts|tsx)?$': 'babel-jest',
  },
  testMatch: ['**/?(*.)+(spec|test).{ts,tsx}'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/config/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/config/fileMock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs|cjs)$': '<rootDir>/config/babel.jest.cjs',
  },
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  transformIgnorePatterns: ['node_modules/(?!@testing-library|react)', '^.+\\.module\\.(css|sass|scss)$'],
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.ts'],
};
