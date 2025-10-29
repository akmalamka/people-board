import type { AlertColor } from '@mui/material/Alert'
import type { FC } from 'react'
import type { ToastState } from './toastContext'
import { Alert, Snackbar } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { initialToastState, ToastContext } from './toastContext'

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  // Use local state to manage the toast visibility and content
  const [toastState, setToastState] = useState<ToastState>(initialToastState)

  const closeToast = useCallback(() => {
    setToastState(prev => ({ ...prev, open: false }))
  }, [])

  const showToast = useCallback((message: string, severity: AlertColor = 'success') => {
    setToastState({
      message,
      severity,
      open: true,
    })
  }, [])

  const contextValue = useMemo(() => ({
    showToast,
    closeToast,
  }), [showToast, closeToast])

  return (
    <ToastContext value={contextValue}>
      {children}

      <Snackbar
        open={toastState.open}
        autoHideDuration={4000} // Close after 4 seconds
        onClose={closeToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position it in the bottom right
      >
        <Alert
          onClose={closeToast}
          severity={toastState.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </ToastContext>
  )
}
