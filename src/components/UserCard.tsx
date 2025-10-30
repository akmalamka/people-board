import type { User } from '@/types/user'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material'
import ActionButton from '@/components/ui/ActionButton'

interface UserCardProps {
  user: User
  onView?: (user: User) => void
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
}
// TODO: convert to styled components
export default function UserCard({ user, onView, onEdit, onDelete }: UserCardProps) {
  return (
    <Card
      className="flex flex-col items-center justify-between shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200 h-full"
    >
      <CardMedia
        component="img"
        image={user.image || '/placeholder.jpg'}
        alt={user.name}
        sx={{
          height: 180,
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <CardContent className="flex flex-col items-center text-center">
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            maxWidth: '95%',
          }}
        >
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" className="mt-1 text-gray-600">
          {user.companyName}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          p: 1,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ width: '100%' }}
          className=" flex flex-wrap gap-2"
        >
          <ActionButton label="View" icon={<VisibilityIcon />} color="primary" sx={{ flexGrow: 1 }} onClick={() => onView?.(user)} />
          <ActionButton label="Edit" icon={<EditIcon />} color="secondary" sx={{ flexGrow: 1 }} onClick={() => onEdit?.(user)} />
          <ActionButton label="Delete" icon={<DeleteIcon />} color="error" sx={{ flexGrow: { xs: 1, md: 2 } }} onClick={() => onDelete?.(user)} />
        </Stack>
      </CardActions>
    </Card>
  )
}
