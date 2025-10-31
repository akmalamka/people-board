import type { User } from '@/types/user'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

interface UserDetailDialogProps {
  user: User | null
  open: boolean
  onClose: () => void
  onEdit: (user: User) => void
}

export default function UserDetailDialog({ user, open, onClose, onEdit }: UserDetailDialogProps) {
  // If no user or not open, don't render anything unnecessarily
  if (!user)
    return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {user.name}
        's Details
      </DialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Email:
            {' '}
            <Box component="span" sx={{ fontWeight: 'normal' }}>{user.email}</Box>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Phone:
            {' '}
            <Box component="span" sx={{ fontWeight: 'normal' }}>{user.phone}</Box>
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Website:
            {' '}
            <Box component="span" sx={{ fontWeight: 'normal' }}>{user.website}</Box>
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
            Company Name:
            {' '}
            {user.companyName}
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>
            Address:
          </Typography>
          <Typography variant="body2">
            {user.address?.street}
            ,
            {user.address?.suite}
          </Typography>
          <Typography variant="body2">
            {user.address?.city}
            ,
            {user.address?.zipcode}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button
          onClick={() => {
            onEdit(user) // Trigger the edit action
            onClose() // Close the dialog
          }}
          color="secondary"
          variant="contained"
        >
          Edit User
        </Button>
      </DialogActions>
    </Dialog>
  )
}
