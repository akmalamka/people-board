import type { User } from '@/types/user'
import { createContext, use } from 'react'

export interface UserState {
  users: User[]
  selectedUser: User | null
  loading: boolean
}

export type UserAction
  = | { type: 'SET_USERS', payload: User[] }
    | { type: 'SET_LOADING', payload: boolean }
    | { type: 'SELECT_USER', payload: User }
    | { type: 'CLEAR_SELECTION' }
    | { type: 'ADD_USER', payload: User }
    | { type: 'EDIT_USER', payload: User }
    | { type: 'DELETE_USER', payload: { _id: string } }

export interface UserContextProps extends UserState {
  dispatch: React.Dispatch<UserAction>
}

export const initialUserState: UserState = {
  users: [],
  selectedUser: null,
  loading: false,
}

// Using 'undefined' as default value forces consumers to be wrapped in the Provider
export const UserContext = createContext<UserContextProps | undefined>(undefined)

export function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload, loading: false }

    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload }

    case 'CLEAR_SELECTION':
      return { ...state, selectedUser: null }

    case 'ADD_USER': {
      return {
        ...state,
        users: [action.payload, ...state.users],
      }
    }

    case 'EDIT_USER': {
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user,
        ),
        selectedUser: state.selectedUser?._id === action.payload._id ? action.payload : state.selectedUser,
      }
    }

    case 'DELETE_USER': {
      const userIdToDelete = action.payload._id
      return {
        ...state,
        users: state.users.filter(user => user._id !== userIdToDelete),
        selectedUser: state.selectedUser?._id === userIdToDelete ? null : state.selectedUser,
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
