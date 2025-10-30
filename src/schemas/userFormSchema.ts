import type { User } from '@/types/user'
import * as yup from 'yup'

const addressSchema = yup.object({
  street: yup.string().optional().nullable(),
  suite: yup.string().optional().nullable(),
  city: yup.string().optional().nullable(),
  zipcode: yup.string().optional().nullable(),
})

export const addUserSchema = yup.object({
  name: yup.string().required('Full Name is required'),
  username: yup.string().optional().nullable(),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),

  website: yup.string().optional().nullable(),
  companyName: yup.string().optional().nullable(),

  address: addressSchema.optional(),
})

// Infer the TypeScript type from the Yup schema for easy typing
// TODO: change AddUserFormData to UserFormData
export type AddUserFormData = Omit<User, '_id' | 'image'>
