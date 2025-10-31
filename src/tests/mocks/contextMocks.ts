import type { AlertColor } from '@mui/material/Alert'
import type { MockedFunction } from 'vitest'
import type { ToastContextProps } from '@/context/toast/ToastContext'
import type { UserAction, UserContextProps } from '@/context/user/UserContext'
import { vi } from 'vitest'

interface MockedToastContext extends ToastContextProps {
  showToast: MockedFunction<(message: string, severity?: AlertColor) => void>
  closeToast: MockedFunction<() => void>
}

export const mockToastContext: MockedToastContext = {
  showToast: vi.fn(),
  closeToast: vi.fn(),
} as MockedToastContext

interface MockedUserContext extends UserContextProps {
  dispatch: MockedFunction<(action: UserAction) => void>
}

const mockUser = {
  _id: 'mock-user-1',
  name: 'Test User',
  email: 'test@example.com',
  image: 'https://picsum.photos/seed/100/200/300.webp',
  phone: '1-555-555-5555',
  username: 'testuser',
  address: {
    street: '123 Mock Lane',
    city: 'Testville',
  },
  companyName: 'Mock Corp',
}

export const mockUserContext: MockedUserContext = {
  users: [mockUser],
  selectedUser: null,
  loading: false,

  dispatch: vi.fn(),
} as MockedUserContext

export function resetContextMocks() {
  mockToastContext.showToast.mockClear()
  mockToastContext.closeToast.mockClear()
  mockUserContext.dispatch.mockClear()
}
