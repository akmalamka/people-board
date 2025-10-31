import { describe, expect, it } from 'vitest'
import App from './App'
import { render, screen } from './tests/test-utils'

describe('app component render correctly', () => {
  it('renders App component with the default title', () => {
    render(<App />)

    expect(screen.getByTestId('user-display')).toHaveTextContent('User Directory')
  })
})
