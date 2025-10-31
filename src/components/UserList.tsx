import type { User } from '@/types/user'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog'
import UserCard from '@/components/UserCard'
import UserDetailDialog from '@/components/UserDetailDialog'
import { useToast } from '@/context/toast/ToastContext'
import { useUser } from '@/context/user/UserContext'

interface UserListProps {
  onEditClick: (user: User) => void
}

export default function UserList({ onEditClick }: UserListProps) {
  const { users, dispatch, selectedUser } = useUser()
  const { showToast } = useToast()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const handleCloseDetail = () => {
    dispatch({ type: 'CLEAR_SELECTION' })
  }

  const handleView = (user: User) => {
    dispatch({ type: 'SELECT_USER', payload: user })
  }

  const handleEdit = (user: User) => {
    onEditClick(user)

    dispatch({ type: 'CLEAR_SELECTION' })
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
      const deletedName = userToDelete.name
      dispatch({ type: 'DELETE_USER', payload: userToDelete._id })
      showToast(`User "${deletedName}" has been deleted.`, 'success')
    }
    handleCloseDelete()
  }

  return (
    <>
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {users.map((user: User) => (
          <Grid key={user._id} size={{ xs: 4, sm: 4, md: 3 }}>
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
