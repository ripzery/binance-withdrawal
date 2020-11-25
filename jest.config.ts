import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest', // Adding this line solved the issue
    '^.+\\.ts?$': 'ts-jest',
  },
}

export default config
