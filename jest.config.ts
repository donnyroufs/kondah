export default {
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '.spec.ts$',
}
