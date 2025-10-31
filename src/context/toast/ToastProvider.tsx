import type { AlertColor } from '@mui/material/Alert'
import type { FC } from 'react'
import type { ToastState } from './ToastContext'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCallback, useMemo, useState } from 'react'
import { initialToastState, ToastContext } from './ToastContext'

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  // Use local state to manage the toast visibility and content
  const [toastState, setToastState] = useState<ToastState>(initialToastState)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
        // Top-center on mobile, bottom-right on desktop
        anchorOrigin={{
          vertical: isMobile ? 'top' : 'bottom',
          horizontal: isMobile ? 'center' : 'right',
        }}
        // responsive margin for mobile to avoid hitting the screen edge
        sx={{
          margin: isMobile ? theme.spacing(2) : 0,
          maxWidth: isMobile ? '90%' : 400,
        }}
      >
        <Alert
          onClose={closeToast}
          severity={toastState.severity}
          variant="filled"
          sx={{ width: '100%', p: 1.5 }}
        >
          {toastState.message}
        </Alert>
      </Snackbar>
    </ToastContext>
  )
}
