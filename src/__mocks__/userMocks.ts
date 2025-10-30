/* eslint-disable react/no-unnecessary-use-prefix */
import type { User } from '@/types/user'

// 1. Mock User Data
export const mockUser: User = {
  _id: 'U101',
  name: 'Test User',
  email: 'test@example.com',
  image: '/test-img.jpg',
  phone: '555-1234',
  address: { city: 'Test City', zipcode: '12345' },
  username: 'testuser',
  website: 'test.com',
  companyName: 'Test Co.',
}

// 2. Mock useUser Hook
export const mockUseUser = {
  users: [mockUser],
  dispatch: jest.fn(),
  selectedUser: null,
  loading: false,
}

// 3. Mock useToast Hook
export const mockUseToast = {
  showToast: jest.fn(),
  closeToast: jest.fn(),
}

// 4. Mock the module imports
jest.mock('@/context/UserContext', () => ({
  useUser: () => mockUseUser,
}))

jest.mock('@/context/ToastContext', () => ({
  useToast: () => mockUseToast,
}))
