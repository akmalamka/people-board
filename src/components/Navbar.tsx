import { PersonAdd } from '@mui/icons-material'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

export default function Navbar() {
  return (
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
            Bite of Appetite
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
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
  )
}
