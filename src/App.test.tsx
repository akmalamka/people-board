import { describe, expect, it } from 'vitest'
import App from './App'
import { render, screen } from './tests/test-utils'

describe('app Component Integration Test', () => {
  it('✅ Renders App component with the default mocked user data', () => {
    render(<App />)

    expect(screen.getByTestId('user-display')).toHaveTextContent('User Directory')
  })
})
