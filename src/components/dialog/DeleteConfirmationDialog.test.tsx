import { describe, expect, it, vi } from 'vitest'
import { mockUserContext } from '@/tests/mocks/contextMocks'
import { fireEvent, render, screen } from '@/tests/test-utils'
import DeleteConfirmationDialog from './DeleteConfirmationDialog'

const mockUser = mockUserContext.users[0]

describe('deleteConfirmationDialog', () => {
  const mockOnClose = vi.fn()
  const mockOnConfirm = vi.fn()

  const renderOpenDialog = (user = mockUser) => {
    render(
      <DeleteConfirmationDialog
        user={user}
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    )
  }

  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnConfirm.mockClear()
  })

  it('✅ Renders the title and the correct description text with the user name', () => {
    renderOpenDialog()

    expect(screen.getByText('Confirm Deletion')).toBeInTheDocument()
  })

  it('✅ Calls onClose when the "Cancel" button is clicked', () => {
    renderOpenDialog()

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
    expect(mockOnConfirm).not.toHaveBeenCalled()
  })

  it('✅ Calls onConfirm when the "Delete" button is clicked', () => {
    renderOpenDialog()

    const deleteButton = screen.getByRole('button', { name: /Delete/i })
    fireEvent.click(deleteButton)

    expect(mockOnConfirm).toHaveBeenCalledTimes(1)
    expect(mockOnClose).not.toHaveBeenCalled()
  })
})
