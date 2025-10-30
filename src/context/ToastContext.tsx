import type { AlertColor } from '@mui/material/Alert'
import { createContext, use } from 'react'

export interface ToastState {
  message: string
  severity: AlertColor // 'success', 'error', 'warning', 'info'
  open: boolean
}

export interface ToastContextProps {
  showToast: (message: string, severity?: AlertColor) => void
  closeToast: () => void
}

export const initialToastState: ToastState = {
  message: '',
  severity: 'success', // Default to success
  open: false,
}

export const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export function useToast() {
  const context = use(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
