/* eslint-disable no-console */
import type { User } from '@/types/user'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material'
import * as React from 'react'
import UserCard from '@/components/UserCard'
import { useUser } from '@/context/UserContext'

export default function UserList() {
  const { users, dispatch } = useUser()

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null)

  const handleView = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user })
    console.log(`User selected for view: ${user.name}`)
    // TODO: add modal
  }

  const handleEdit = (user: User) => {
    // For "Edit," you'd typically select the user and open an edit form
    dispatch({ type: 'SELECT_USER', payload: user })
    console.log(`User selected for edit: ${user.name}`)
    // This action could be used to populate an edit form state
  }

  const handleDelete = (user: User) => {
    setUserToDelete(user)
    setOpenDeleteDialog(true)
  }

  const handleClose = () => {
    setOpenDeleteDialog(false)
    setUserToDelete(null)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      // Dispatch the context action only after user confirmation
      dispatch({ type: 'DELETE_USER', payload: userToDelete.id })
    }
    handleClose()
  }

  const DeleteConfirmationDialog = (
    <Dialog
      open={openDeleteDialog}
      onClose={handleClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete user
          {' '}
          <strong>
            {userToDelete?.name}
          </strong>
          ? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          autoFocus // Focus the destructive action button for better UX/a11y
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )

  // --- Component Rendering ---
  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {users.map((user: User) => (
          <Grid key={user.id} size={{ xs: 4, sm: 4, md: 3 }}>
            <UserCard
              user={user}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      {DeleteConfirmationDialog}
    </>
  )
}
