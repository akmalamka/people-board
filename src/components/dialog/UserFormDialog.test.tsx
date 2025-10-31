import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { mockUserContext } from '@/tests/mocks/contextMocks'
import { render, screen, waitFor } from '@/tests/test-utils'
import UserFormDialog from './UserFormDialog'

const userToEdit = {
  ...mockUserContext.users[0],
  _id: 'user-to-edit-id',
  username: 'testuser',
  website: 'www.old-website.com',
  companyName: 'Old Corp',
  address: {
    street: 'Old Street',
    suite: 'Suite A',
    city: 'Old City',
    zipcode: '12345',
  },
}

const newValidData = {
  name: 'New Test Name',
  username: 'newname',
  email: 'new.email@example.com',
  phone: '987-654-3210',
  website: 'www.new-site.com',
  companyName: 'New Corp',
  address: {
    street: 'New Street',
    suite: 'New Suite',
    city: 'New City',
    zipcode: '98765',
  },
}

const mockOnClose = vi.fn()
const mockOnSave = vi.fn()
const user = userEvent.setup() // Setup user event for typing

// Helper function to render the component
function renderDialog(props: Partial<React.ComponentProps<typeof UserFormDialog>> = {}) {
  return render(
    <UserFormDialog
      open={true}
      onClose={mockOnClose}
      onSave={mockOnSave}
      userToEdit={null} // Default to ADD mode
      {...props}
    />,
  )
}

describe('userFormDialog', () => {
  beforeEach(() => {
    mockOnClose.mockClear()
    mockOnSave.mockClear()
  })

  describe('in ADD Mode (userToEdit is null)', () => {
    it('renders with the "Add New User" title and "Add User" button', () => {
      renderDialog({ open: true, userToEdit: null })

      expect(screen.getByText('Add New User')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Add User/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Add User/i })).toBeDisabled()
    })

    it('shows error message and keeps button disabled when required field is empty', async () => {
      renderDialog()

      const nameInput = screen.getByLabelText(/Full Name/i)

      // Clear the input (it should already be empty, but ensures focus/blur)
      await user.clear(nameInput)

      // Blur the field to trigger validation
      await user.tab()

      // Assert: Error message for 'Full Name' appears
      await waitFor(() => {
        expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Add User/i })).toBeDisabled()
      })
    })

    it('submits valid data correctly and calls onSave with data and no ID', async () => {
      renderDialog()

      await user.type(screen.getByLabelText(/Full Name/i), newValidData.name)
      await user.type(screen.getByLabelText(/Email/i), newValidData.email)
      await user.type(screen.getByLabelText(/Phone/i), newValidData.phone)

      // Blur the field to trigger validation
      await user.tab()

      const submitButton = screen.getByRole('button', { name: /Add User/i })
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled()
      })

      await user.click(submitButton)

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledTimes(1)
        const expectedData = {
          name: newValidData.name,
          email: newValidData.email,
          phone: newValidData.phone,
          username: null, // Should default to null
          website: null,
          companyName: null,
          address: {
            street: null,
            suite: null,
            city: null,
            zipcode: null,
          },
        }
        expect(mockOnSave).toHaveBeenCalledWith(expectedData, undefined)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('in EDIT Mode (userToEdit is set)', () => {
    it('renders with the "Edit User Details" title and "Save Changes" button, pre-populating fields', () => {
      renderDialog({ userToEdit })

      expect(screen.getByText('Edit User Details')).toBeInTheDocument()
      const saveButton = screen.getByRole('button', { name: /Save Changes/i })
      expect(saveButton).toBeInTheDocument()

      expect(screen.getByLabelText(/Full Name/i)).toHaveValue(userToEdit.name)
      expect(screen.getByLabelText(/Username/i)).toHaveValue(userToEdit.username)
      expect(screen.getByLabelText(/Email/i)).toHaveValue(userToEdit.email)
      expect(screen.getByLabelText(/Phone/i)).toHaveValue(userToEdit.phone)
      expect(screen.getByLabelText(/Website/i)).toHaveValue(userToEdit.website)
      expect(screen.getByLabelText(/Company Name/i)).toHaveValue(userToEdit.companyName)
      expect(screen.getByLabelText(/Street/i)).toHaveValue(userToEdit.address.street)
    })

    it('submits updated data and calls onSave with data and user ID', async () => {
      renderDialog({ userToEdit })

      const nameInput = screen.getByLabelText(/Full Name/i)
      await user.clear(nameInput)
      await user.type(nameInput, newValidData.name)

      const saveButton = screen.getByRole('button', { name: /Save Changes/i })
      await user.click(saveButton)

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledTimes(1)

        const expectedFormData = {
          name: newValidData.name,
          username: userToEdit.username,
          email: userToEdit.email,
          phone: userToEdit.phone,
          website: userToEdit.website,
          companyName: userToEdit.companyName,
          address: userToEdit.address,
        }

        expect(mockOnSave).toHaveBeenCalledWith(expectedFormData, userToEdit._id)
        expect(mockOnClose).toHaveBeenCalledTimes(1)
      })
    })
  })

  it('calls onClose when the "Cancel" button is clicked', async () => {
    renderDialog()

    const cancelButton = screen.getByRole('button', { name: /Cancel/i })
    await user.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
