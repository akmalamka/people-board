import { Box, Typography } from '@mui/material'
import Navbar from '@/components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ p: 4 }}>
        <Typography variant="h4">Main Content</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Scroll down to see the sticky navbar in action.
        </Typography>
      </Box>
    </>
  )
}
