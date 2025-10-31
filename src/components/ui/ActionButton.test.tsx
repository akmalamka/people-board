import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@/tests/test-utils'
import ActionButton from './ActionButton'

// Mock a simple icon component for testing purposes
const MockIcon = () => <svg data-testid="mock-icon" />

describe('actionButton', () => {
  const mockOnClick = vi.fn()
  const testLabel = 'Action Label'

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renders the label and icon, and passes through standard props', () => {
    render(
      <ActionButton
        label={testLabel}
        icon={<MockIcon />}
        onClick={mockOnClick}
        data-testid="action-button"
      />,
    )

    expect(screen.getByText(testLabel, { exact: false })).toBeInTheDocument()

    expect(screen.getByTestId('mock-icon')).toBeInTheDocument()

    const buttonElement = screen.getByRole('button', { name: testLabel })
    expect(buttonElement).toHaveAttribute('data-testid', 'action-button')
    expect(buttonElement).toHaveClass('MuiButton-outlined') // Check variant prop
  })

  it('calls the onClick handler when the button is clicked', () => {
    render(
      <ActionButton
        label={testLabel}
        icon={<MockIcon />}
        onClick={mockOnClick}
      />,
    )

    const buttonElement = screen.getByRole('button', { name: testLabel })

    fireEvent.click(buttonElement)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
