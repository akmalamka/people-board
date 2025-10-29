import * as yup from 'yup'

const addressSchema = yup.object({
  street: yup.string().optional(),
  suite: yup.string().optional(),
  city: yup.string().optional(),
  zipcode: yup.string().optional(),
})

export const addUserSchema = yup.object({
  name: yup.string().required('Full Name is required'),
  username: yup.string().optional(),
  email: yup.string().email('Must be a valid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),

  website: yup.string().optional(),
  companyName: yup.string().optional(),

  address: addressSchema.optional(),
})

// Infer the TypeScript type from the Yup schema for easy typing
export type AddUserFormData = yup.InferType<typeof addUserSchema>
