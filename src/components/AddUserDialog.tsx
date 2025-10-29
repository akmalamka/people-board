import type { AddUserFormData } from '@/schemas/userFormSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { addUserSchema } from '@/schemas/userFormSchema'

interface AddUserDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: AddUserFormData) => void
}

const defaultValues = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  companyName: '',
  address: {
    street: '',
    suite: '',
    city: '',
    zipcode: '',
  },
}

export default function AddUserDialog({ open, onClose, onSave }: AddUserDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues,
    mode: 'onBlur',
  })

  const onSubmit = (data: AddUserFormData) => {
    onSave(data)
    reset(defaultValues)
    onClose()
  }

  const handleClose = () => {
    reset(defaultValues)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>Add New User</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>

          <Typography variant="subtitle1" fontWeight="bold" mt={1}>
            Basic Information
          </Typography>

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                required
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}

                label="Email"
                type="email"
                required
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone"
                required
                fullWidth
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            )}
          />

          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Website"
                fullWidth
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            )}
          />

          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Address (Optional)
          </Typography>

          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street"
                fullWidth
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
              />
            )}
          />
          <Controller
            name="address.suite"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Suite"
                fullWidth
                error={!!errors.address?.suite}
                helperText={errors.address?.suite?.message}
              />
            )}
          />

          <Box display="flex" gap={2}>
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  fullWidth
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                />
              )}
            />
            <Controller
              name="address.zipcode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Zipcode"
                  fullWidth
                  error={!!errors.address?.zipcode}
                  helperText={errors.address?.zipcode?.message}
                />
              )}
            />
          </Box>

          {/* Company Details (Optional) */}
          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Company Details (Optional)
          </Typography>

          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            )}
          />

          <Typography variant="body2" color="text.secondary" mt={2}>
            *Profile image will be set to a static, unique placeholder based on the new user's ID.*
          </Typography>

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting || !isValid}
        >
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  )
}
