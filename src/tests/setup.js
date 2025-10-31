import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll } from 'vitest'
import { resetContextMocks } from '../tests/mocks/contextMocks'
import { restoreMathRandom, stubMathRandom } from '../tests/mocks/globalMocks'

import '@testing-library/jest-dom/vitest'

/**
 * Mocks Math.random once before any tests run.
 * We use beforeAll here for the initial stubbing since Math.random needs to be mocked
 * before the code that uses it (like the UserReducer) is evaluated.
 */
beforeAll(() => {
  stubMathRandom()
})

/**
 * Cleanup and Isolation: Runs after every single test.
 */
afterEach(() => {
  cleanup()

  resetContextMocks()

  restoreMathRandom()
})
