import type { RenderOptions } from '@testing-library/react'
import type { ReactElement } from 'react'
import type { ToastContextProps } from '@/context/toast/ToastContext'
import type { UserContextProps } from '@/context/user/UserContext'
import { render } from '@testing-library/react'

import React from 'react'

import { ToastContext } from '@/context/toast/ToastContext'
import { UserContext } from '@/context/user/UserContext'

import { mockToastContext, mockUserContext } from './mocks/contextMocks'

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  toastValue?: Partial<ToastContextProps>
  userValue?: Partial<UserContextProps>
}

// eslint-disable-next-line react-refresh/only-export-components
function CustomProviders({ children, toastValue, userValue }: {
  children: React.ReactNode
  toastValue?: Partial<ToastContextProps>
  userValue?: Partial<UserContextProps>
}) {
  // Merge default mocks with any provided overrides

  // eslint-disable-next-line react/no-unstable-context-value
  const finalToastValue = { ...mockToastContext, ...toastValue } as ToastContextProps
  // eslint-disable-next-line react/no-unstable-context-value
  const finalUserValue = { ...mockUserContext, ...userValue } as UserContextProps

  return (
    <UserContext value={finalUserValue}>
      <ToastContext value={finalToastValue}>
        {children}
      </ToastContext>
    </UserContext>
  )
}

// Custom render function
function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { toastValue, userValue, ...rtlOptions } = options || {}

  // Pass a function to 'wrapper' that applies the custom providers
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <CustomProviders toastValue={toastValue} userValue={userValue}>
      {children}
    </CustomProviders>
  )

  return render(ui, { wrapper: Wrapper, ...rtlOptions })
}

// Re-export everything from @testing-library/react
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

// Override the default render with your custom one
export { customRender as render }
