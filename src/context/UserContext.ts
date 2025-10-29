import type { User } from '@/types/user'
import { createContext, use } from 'react'

export interface UserState {
  users: User[]
  selectedUser: User | null
}

export type UserAction
  = | { type: 'SET_USERS', payload: User[] }
    | { type: 'SELECT_USER', payload: User }
    | { type: 'CLEAR_SELECTION' }
    | { type: 'ADD_USER', payload: Omit<User, 'id'> } // New user doesn't have an ID yet
    | { type: 'EDIT_USER', payload: User }
    | { type: 'DELETE_USER', payload: number } // Payload is the User ID

// This is what the component consumes (State + Dispatch function)
export interface UserContextProps extends UserState {
  dispatch: React.Dispatch<UserAction>
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
}

// Using 'undefined' as default value forces consumers to be wrapped in the Provider
export const UserContext = createContext<UserContextProps | undefined>(undefined)

// Helper function to generate a unique ID for new users
function getNextId(users: User[]): number {
  const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0)
  return maxId + 1
}

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload }

    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload }

    case 'CLEAR_SELECTION':
      return { ...state, selectedUser: null }

    case 'ADD_USER': {
      const newUser = {
        ...action.payload,
        id: getNextId(state.users), // Assign a new ID
      } as User
      return {
        ...state,
        users: [...state.users, newUser],
      }
    }

    case 'EDIT_USER': {
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user,
        ),
        // Clear selection if the edited user was selected
        selectedUser: state.selectedUser?.id === action.payload.id ? action.payload : state.selectedUser,
      }
    }

    case 'DELETE_USER': {
      const userIdToDelete = action.payload
      return {
        ...state,
        users: state.users.filter(user => user.id !== userIdToDelete),
        // Clear selection if the deleted user was selected
        selectedUser: state.selectedUser?.id === userIdToDelete ? null : state.selectedUser,
      }
    }

    default:
      return state
  }
}

// Custom Hook for Context Consumption
export function useUser() {
  const context = use(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
