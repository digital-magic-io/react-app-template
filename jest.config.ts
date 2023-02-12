import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //collectCoverage: true,
  //collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/index.tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: 'test',
  moduleFileExtensions: ['tsx', 'ts', 'js']
  // moduleFileExtensions: ['ts', 'tsx'],
  //modulePathIgnorePatterns: ['infra']
  /*
  reporters: [
    [
      'jest-silent-reporter',
      {
        useDots: true,
        showWarnings: true,
        showPaths: true
      }
    ]
  ]
  */
  /*
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }/*,
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react'
        ]
      }
    }
  }
  */
  /*
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [
          '@babel/preset-env',
          ['@babel/plugin-transform-react-jsx', {
            'runtime': 'automatic'
          }]
        ]
      }
    }
  }
  */
}

export default config
