import { Box, Container, Typography } from '@mui/material'
import Navbar from '@/components/Navbar'
import UserList from '@/components/UserList'

export default function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Container sx={{ py: 4 }}>
          <Typography variant="h4" fontWeight={700} mb={3}>
            User Directory
          </Typography>

          <UserList />
        </Container>
      </Box>
    </>
  )
}
