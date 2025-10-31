import { vi } from 'vitest'

// We'll use a constant, predictable UUID for testing new user creation
const mockUuid = '00000000-0000-0000-0000-000000000001'

vi.mock('crypto', () => ({
  // Return the fixed mock ID every time
  randomUUID: vi.fn(() => mockUuid),
}))

const originalMathRandom = Math.random
const mockMathRandom = vi.fn()

// Define a stable random seed value (e.g., 0.5)
const fixedRandomSeed = 0.5

/**
 * Mocks Math.random to return a fixed value.
 */
export function stubMathRandom() {
  // Use mockImplementation to ensure the mock is active
  mockMathRandom.mockImplementation(() => fixedRandomSeed)
  Math.random = mockMathRandom as unknown as () => number
}

/**
 * Restores the original Math.random. Call this in afterEach.
 */
export function restoreMathRandom() {
  Math.random = originalMathRandom
}

export const MOCKED_UUID = mockUuid
export const MOCKED_IMAGE_SEED = Math.floor(fixedRandomSeed * 100000) // 50000
