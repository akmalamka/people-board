import type { UserFormData } from '@/schemas/userFormSchema'
import type { User } from '@/types/user'
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
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { addUserSchema } from '@/schemas/userFormSchema'

const defaultValues = {
  name: '',
  username: null,
  email: '',
  phone: '',
  website: null,
  companyName: null,
  address: {
    street: null,
    suite: null,
    city: null,
    zipcode: null,
  },
}

interface UserFormDialogProps {
  open: boolean
  onClose: () => void
  onSave: (data: UserFormData, id?: string) => void
  // Optional user object signals EDIT mode
  userToEdit?: User | null
}

function getInitialFormValues(user?: User | null) {
  if (!user)
    return defaultValues

  return {
    name: user.name,
    username: user.username ?? null,
    email: user.email,
    phone: user.phone,
    website: user.website ?? null,
    companyName: user.companyName ?? null,
    address: user.address
      ? {
          street: user.address.street ?? null,
          suite: user.address.suite ?? null,
          city: user.address.city ?? null,
          zipcode: user.address.zipcode ?? null,
        }
      : defaultValues.address,
  }
}

export default function UserFormDialog({ open, onClose, onSave, userToEdit }: UserFormDialogProps) {
  // Determine the mode and content
  const isEditMode = !!userToEdit
  const dialogTitle = isEditMode ? 'Edit User Details' : 'Add New User'
  const buttonText = isEditMode ? 'Save Changes' : 'Add User'

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(addUserSchema),
    defaultValues: getInitialFormValues(userToEdit),
    mode: 'onBlur',
  })

  // Ensure the form resets whenever the dialog opens or the userToEdit changes
  useEffect(() => {
    if (open) {
      // Reset to the current userToEdit state (or default values if adding)
      reset(getInitialFormValues(userToEdit))
    }
  }, [userToEdit, open, reset])

  const onSubmit = (data: UserFormData) => {
    // Pass the data and the user ID (if editing) to the onSave handler
    onSave(data, userToEdit?._id)
    onClose()
  }

  const handleClose = () => {
    reset(getInitialFormValues(userToEdit)) // Reset form state before closing
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
      <DialogTitle>{dialogTitle}</DialogTitle>
      {' '}
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
                value={field.value ?? ''}
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
                value={field.value ?? ''}
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
                value={field.value ?? ''}
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
                value={field.value ?? ''}
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
                  value={field.value ?? ''}
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
                  value={field.value ?? ''}
                  label="Zipcode"
                  fullWidth
                  error={!!errors.address?.zipcode}
                  helperText={errors.address?.zipcode?.message}
                />
              )}
            />
          </Box>

          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Company Details (Optional)
          </Typography>

          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ''}
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
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
