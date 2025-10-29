/* eslint-disable no-console */
import type { User } from '@/types/user'
import { Grid } from '@mui/material'
import * as React from 'react'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import UserCard from '@/components/UserCard'
import UserDetailDialog from '@/components/UserDetailDialog'
import { useUser } from '@/context/UserContext'

export default function UserList() {
  const { users, dispatch, selectedUser } = useUser()

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [userToDelete, setUserToDelete] = React.useState<User | null>(null)

  const handleCloseDetail = () => {
    dispatch({ type: 'CLEAR_SELECTION' })
  }

  const handleView = (user: User) => {
    // Select user to open the UserDetailDialog
    dispatch({ type: 'SELECT_USER', payload: user })
  }

  const handleEdit = (user: User) => {
    // Select user (for edit form) and close the detail dialog if it's open
    dispatch({ type: 'SELECT_USER', payload: user })
    handleCloseDetail()
    console.log(`User selected for edit: ${user.name}`)
  }

  const handleDelete = (user: User) => {
    setUserToDelete(user)
    setOpenDeleteDialog(true)
  }

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false)
    setUserToDelete(null)
  }

  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch({ type: 'DELETE_USER', payload: userToDelete.id })
      console.log(`User deleted: ${userToDelete.name}`)
    }
    handleCloseDelete()
  }

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

      <UserDetailDialog
        user={selectedUser}
        open={Boolean(selectedUser)}
        onClose={handleCloseDetail}
        onEdit={handleEdit}
      />

      <DeleteConfirmationDialog
        user={userToDelete}
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
