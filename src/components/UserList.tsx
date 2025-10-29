import type { User } from '@/types/user'
import { Grid } from '@mui/material'
import UserCard from '@/components/UserCard'
import users from '@/constants/users.json'

export default function UserList() {
  const typedUsers = users as User[]

  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {typedUsers.map(user => (
        <Grid key={user.id} size={{ xs: 4, sm: 4, md: 3 }}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  )
}
