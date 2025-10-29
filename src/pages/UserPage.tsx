import type { User } from '@/types/user'
import { Container, Grid, Typography } from '@mui/material'
import UserCard from '@/components/UserCard'
import users from '@/constants/users.json'

export default function UsersPage() {
  const typedUsers = users as User[]

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        User Directory
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {typedUsers.map(user => (
          <Grid key={user.id} size={{ xs: 4, sm: 4, md: 3 }}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
