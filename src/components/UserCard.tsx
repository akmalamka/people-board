import type { User } from '@/types/user'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Card
      className="flex flex-col items-center shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-200"
      sx={{ height: 320 }}
    >
      <CardMedia
        component="img"
        image={user.image}
        alt={user.name}
        sx={{
          height: 180,
          width: '100%',
          objectFit: 'cover',
        }}
      />

      <CardContent className="flex flex-col items-center text-center">
        <Typography variant="h6" fontWeight={600}>
          {user.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" className="mt-1 text-gray-600">
          {user.company?.name}
        </Typography>
      </CardContent>
    </Card>
  )
}
