export interface Address {
  street?: string | null
  suite?: string | null
  city?: string | null
  zipcode?: string | null
}

export interface User {
  _id: string
  name: string
  username?: string | null
  image: string
  email: string
  address?: Address
  phone: string
  website?: string | null
  companyName?: string | null
}
