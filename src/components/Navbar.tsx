import type { AddUserFormData } from '@/schemas/userFormSchema'
import { PersonAdd } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { useToast } from '@/context/toastContext'
import { useUser } from '@/context/userContext'
import AddUserDialog from './AddUserDialog'

export default function Navbar() {
  const { dispatch } = useUser()

  const [openAddDialog, setOpenAddDialog] = useState(false)
  const { showToast } = useToast()

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true)
  }

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false)
  }

  const handleSaveNewUser = (userData: AddUserFormData) => {
    dispatch({ type: 'ADD_USER', payload: userData })
    handleCloseAddDialog()
    // Show success toast
    showToast(`User "${userData.name}" added successfully!`, 'success')
  }
  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={1}
        sx={{
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
          px: { xs: 2, md: 4 },
        }}
      >
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: 'primary.main',
              }}
            >
              PeopleBoard
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAdd />}
            onClick={handleOpenAddDialog}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Add User
          </Button>
        </Toolbar>
      </AppBar>

      <AddUserDialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        onSave={handleSaveNewUser}
      />
    </>

  )
}
