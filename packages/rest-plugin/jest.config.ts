export default {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
}
