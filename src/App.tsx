import { Box } from '@mui/material'
import Navbar from '@/components/Navbar'
import UserPage from '@/pages/UserPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <UserPage />
      </Box>
    </>
  )
}
