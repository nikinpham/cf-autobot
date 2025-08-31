import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test|spec).ts'],
  roots: ['<rootDir>/tests'],
  verbose: true,
  maxWorkers: 1, // ổn định thời gian đo
  collectCoverage: false,
};

export default config;
