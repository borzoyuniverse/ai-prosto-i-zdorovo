import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/test/unit/**/*.spec.ts',
    '<rootDir>/test/integration/**/*.spec.ts',
    '<rootDir>/test/e2e/**/*.e2e-spec.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json'],
  roots: ['<rootDir>'],
  // ускоряет работу с ES-модулями
  transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }] },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/test/', '<rootDir>/scripts/', '<rootDir>/ormconfig.ts', '<rootDir>/jest.config.ts'],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  passWithNoTests: true
};

export default config;
