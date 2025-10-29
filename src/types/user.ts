export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
}

export interface User {
  id: number
  name: string
  username?: string
  image: string
  email: string
  address?: Address
  phone: string
  website: string
  companyName?: string
}
