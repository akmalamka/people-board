import '@testing-library/jest-dom'

// Set a global mock for crypto.randomUUID() since the environment (jsdom) might not always provide it consistently.
if (typeof crypto.randomUUID === 'undefined') {
  crypto.randomUUID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
