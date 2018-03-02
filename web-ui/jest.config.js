module.exports = {
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '**/__tests__/*.(ts|tsx|js)',
  ],
  collectCoverageFrom: [
    'src/**/*.{vue,ts}',
    '!src/registerServiceWorker.ts',
    '!src/theme.ts',
    '!src/**/*.d.ts',
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text-summary',
  ],
  setupFiles: [
    './config/jest.setup.ts',
  ],
};
