import type { FC } from 'react'
import type { User } from '@/types/user'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { USERS_API_ENDPOINT } from '@/constants/api'
import { useToast } from '@/context/toast/ToastContext'
import { initialUserState, UserContext, userReducer } from './UserContext'

interface UserProviderProps {
  children: React.ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState)
  const { showToast } = useToast()

  const fetchInitialUsers = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const response = await fetch(USERS_API_ENDPOINT)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const apiUsers = await response.json() as User[]

      dispatch({ type: 'SET_USERS', payload: apiUsers })
    }
    catch (error) {
      console.error('Failed to fetch initial users:', error)
      showToast('Error loading users. Please check API.', 'error')
    }
    finally {
      // Ensure loading state is turned off even if the fetch fails
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [showToast])

  useEffect(() => {
    fetchInitialUsers()
  }, [fetchInitialUsers])

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
