import { describe, expect, it, vi } from 'vitest'
import { mockUserContext } from '@/tests/mocks/contextMocks'
import { fireEvent, render, screen } from '@/tests/test-utils'
import UserDetailDialog from './UserDetailDialog'

const mockUser = {
  ...mockUserContext.users[0],
  website: 'www.test-user.com',
  address: {
    street: '123 Mock Lane',
    suite: 'Apt 101',
    city: 'Testville',
    zipcode: 'T1E 5ST',
  },
}

describe('userDetailDialog', () => {
  const mockOnClose = vi.fn()
  const mockOnEdit = vi.fn()

  const renderOpenDialog = (user = mockUser) => {
    render(
      <UserDetailDialog
        user={user}
        open={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
      />,
    )
  }

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnEdit.mockClear()
  })

  it('renders the user name in the title and displays all core details', () => {
    renderOpenDialog()

    expect(screen.getByText(`${mockUser.name}'s Details`)).toBeInTheDocument()

    expect(screen.getByText(mockUser.email)).toBeInTheDocument()
    expect(screen.getByText(mockUser.phone)).toBeInTheDocument()
    expect(screen.getByText(mockUser.website)).toBeInTheDocument()
  })

  it('calls onClose when the "Close" button is clicked', () => {
    renderOpenDialog()

    const closeButton = screen.getByRole('button', { name: /Close/i })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).not.toHaveBeenCalled()
  })

  it('calls onEdit and then onClose when the "Edit User" button is clicked', () => {
    renderOpenDialog()

    const editButton = screen.getByRole('button', { name: /Edit User/i })
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('renders null when user prop is null', () => {
    const { container } = render(
      <UserDetailDialog
        user={null}
        open={true}
        onClose={mockOnClose}
        onEdit={mockOnEdit}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })
})
