/* eslint-disable no-console */
import type { User } from '@/types/user'
import { Grid } from '@mui/material'
import UserCard from '@/components/UserCard'
import { useUser } from '@/context/UserContext'

export default function UserList() {
  const { users, dispatch } = useUser()

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
    // For "Delete," dispatch the DELETE_USER action with the user's ID
    // eslint-disable-next-line no-alert
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      dispatch({ type: 'DELETE_USER', payload: user.id })
      console.log(`User deleted: ${user.name}`)
    }
  }

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {users.map((user: User) => (
        <Grid key={user.id} size={{ xs: 4, sm: 4, md: 3 }}>
          <UserCard user={user} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  )
}
