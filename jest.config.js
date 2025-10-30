/**
 * Jest configuration for an ESM project using TypeScript and React Testing Library.
 */
export default {
  // Use the 'ts-jest/presets/default-esm' preset for ESM module transformation
  preset: 'ts-jest/presets/default-esm',

  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  testMatch: ['<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],

  globals: {
    'ts-jest': {
      // Ensure module is set to ESNext for modern ESM compatibility
      tsconfig: {
        module: 'ESNext',
      },
    },
  },

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    // Mocks out non-JS/TS assets that Jest cannot process
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.js',
  },

  transformIgnorePatterns: ['/node_modules/'],
}
