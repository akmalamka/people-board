import type { FC } from 'react'
import type { User } from '@/types/user'
import { useEffect, useMemo, useReducer } from 'react'
import initialUsers from '@/constants/users.json'
import { initialUserState, UserContext, userReducer } from './UserContext'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)

  // Load initial users once when the component mounts
  useEffect(() => {
    // Dispatch an action to load the initial user data from the JSON file
    dispatch({ type: 'SET_USERS', payload: initialUsers as User[] })
  }, [])

  // The context value bundles the state and the dispatch function
  const contextValue = useMemo(() => ({
    ...state,
    dispatch,
  }), [state])

  return (
    <UserContext value={contextValue}>
      {children}
    </UserContext>
  )
}
