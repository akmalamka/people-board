import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@/tests/test-utils'
import Navbar from './Navbar'

describe('navbar', () => {
  const mockOnAddClick = vi.fn()

  beforeEach(() => {
    mockOnAddClick.mockClear()
  })

  it('renders the main title "PeopleBoard"', () => {
    render(<Navbar onAddClick={mockOnAddClick} />)

    const titleElement = screen.getByText('PeopleBoard')
    expect(titleElement).toBeInTheDocument()
  })

  it('renders the "Add User" button', () => {
    render(<Navbar onAddClick={mockOnAddClick} />)

    const buttonElement = screen.getByRole('button', { name: /Add User/i })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls onAddClick prop when the "Add User" button is clicked', () => {
    render(<Navbar onAddClick={mockOnAddClick} />)

    const buttonElement = screen.getByRole('button', { name: /Add User/i })

    fireEvent.click(buttonElement)

    expect(mockOnAddClick).toHaveBeenCalledTimes(1)
  })
})
