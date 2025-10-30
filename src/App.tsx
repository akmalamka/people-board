import type { AddUserFormData } from '@/schemas/userFormSchema'
import type { User } from '@/types/user'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import UserList from '@/components/UserList'
import { useToast } from '@/context/toastContext'
import { useUser } from '@/context/userContext'
import UserFormDialog from './components/UserFormDialog'

export default function App() {
  const { dispatch } = useUser()
  const { showToast } = useToast()

  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)

  const [currentUserToEdit, setCurrentUserToEdit] = useState<User | null>(null)

  const handleOpenAddDialog = () => {
    setCurrentUserToEdit(null) // Clear any user for edit
    setIsFormDialogOpen(true)
  }

  const handleOpenEditDialog = (user: User) => {
    setCurrentUserToEdit(user) // Set user for edit mode
    setIsFormDialogOpen(true)
  }

  const handleCloseFormDialog = () => {
    setIsFormDialogOpen(false)
    setCurrentUserToEdit(null) // Clear user upon close
  }

  const handleSaveUser = (userData: AddUserFormData, _id?: string) => {
    if (_id) {
      // EDIT MODE
      dispatch({ type: 'EDIT_USER', payload: { ...userData, _id } as User })
      showToast(`User "${userData.name}" updated successfully!`, 'success')
    }
    else {
      // ADD MODE
      dispatch({ type: 'ADD_USER', payload: userData })
      showToast(`User "${userData.name}" added successfully!`, 'success')
    }
    handleCloseFormDialog()
  }
  return (
    <>
      <Navbar onAddClick={handleOpenAddDialog} />
      <Box sx={{ p: 4 }}>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            User Directory
          </Typography>

          <UserList onEditClick={handleOpenEditDialog} />
        </Container>
      </Box>

      <UserFormDialog
        open={isFormDialogOpen}
        onClose={handleCloseFormDialog}
        onSave={handleSaveUser}
        userToEdit={currentUserToEdit}
      />
    </>
  )
}
