import type { UserFormData } from '@/schemas/userFormSchema'
import type { User } from '@/types/user'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'

import { lazy, useState } from 'react'
import Navbar from '@/components/Navbar'
import UserList from '@/components/UserList'
import { useToast } from './context/toast/ToastContext'
import { useUser } from './context/user/UserContext'

const LazyUserFormDialog = lazy(() => import('./components/dialog/UserFormDialog'))

export default function App() {
  const { loading, dispatch } = useUser()
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

  const handleSaveUser = (userData: UserFormData, _id?: string) => {
    if (_id && currentUserToEdit) {
      // EDIT MODE
      dispatch({ type: 'EDIT_USER', payload: { ...userData, _id, image: currentUserToEdit.image } as User })
      showToast(`User "${userData.name}" updated successfully!`, 'success')
    }
    else {
      // ADD MODE
      dispatch({ type: 'ADD_USER', payload: userData })
      showToast(`User "${userData.name}" added successfully!`, 'success')
    }
    handleCloseFormDialog()
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          p: 4,
        }}
      >
        <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
          Loading User Directory...
        </Typography>
        <LinearProgress sx={{ width: '80%', maxWidth: '600px' }} color="primary" />
      </Box>
    )
  }

  return (
    <>
      <Navbar onAddClick={handleOpenAddDialog} />
      <Box sx={{ p: 4 }}>
        <Container sx={{ py: 4 }}>
          <Typography
            variant="h1"
            mb={3}
            data-testid="user-display"
          >
            User Directory
          </Typography>

          <UserList
            onEditClick={handleOpenEditDialog}
          />
        </Container>
      </Box>

      <LazyUserFormDialog
        open={isFormDialogOpen}
        onClose={handleCloseFormDialog}
        onSave={handleSaveUser}
        userToEdit={currentUserToEdit}
      />
    </>
  )
}
