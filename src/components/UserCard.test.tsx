import { describe, expect, it, vi } from 'vitest'
import { mockUserContext } from '@/tests/mocks/contextMocks'
import { fireEvent, render, screen } from '@/tests/test-utils'
import UserCard from './UserCard'

const mockUser = mockUserContext.users[0]

describe('userCard', () => {
  const mockOnView = vi.fn()
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    mockOnView.mockClear()
    mockOnEdit.mockClear()
    mockOnDelete.mockClear()
  })

  it('renders user name, email, and company name correctly', () => {
    render(
      <UserCard
        user={mockUser}
        onView={mockOnView}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    )

    expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    expect(screen.getByText(mockUser.email)).toBeInTheDocument()

    if (mockUser.companyName) {
      expect(screen.getByText(mockUser.companyName)).toBeInTheDocument()
    }
  })

  it('renders View, Edit, and Delete buttons', () => {
    render(<UserCard user={mockUser} />)

    expect(screen.getByRole('button', { name: /View/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Delete/i })).toBeInTheDocument()
  })

  it('calls onView with the correct user when "View" is clicked', () => {
    render(<UserCard user={mockUser} onView={mockOnView} />)

    const viewButton = screen.getByRole('button', { name: /View/i })
    fireEvent.click(viewButton)

    expect(mockOnView).toHaveBeenCalledTimes(1)
    expect(mockOnView).toHaveBeenCalledWith(mockUser)
  })

  it('calls onEdit with the correct user when "Edit" is clicked', () => {
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />)

    const editButton = screen.getByRole('button', { name: /Edit/i })
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser)
  })

  it('calls onDelete with the correct user when "Delete" is clicked', () => {
    render(<UserCard user={mockUser} onDelete={mockOnDelete} />)

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser)
  })
})
