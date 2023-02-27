import * as React from 'react'
import { createContext, useCallback, useContext } from 'react'
import { Snackbar, SnackbarProps } from '@controls/Snackbar'
import { SnackbarProvider as NotistackSnackbarProvider, useSnackbar } from 'notistack'

type SnackbarContext = {
  open: (props: SnackbarProps) => void
}

const SnackbarContext = createContext({} as SnackbarContext)

const CustomSnackbarProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const snackbar = useSnackbar()

  const open = useCallback((props: SnackbarProps) => {
    snackbar.enqueueSnackbar(undefined, {
      content: (key) => (
        <Snackbar
          key={key}
          {...props}
          onClose={() => {
            props.onClose?.()
            snackbar.closeSnackbar(key)
          }}
        />
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <SnackbarContext.Provider value={{ open }}>{children}</SnackbarContext.Provider>
}

export const SnackbarProvider: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <NotistackSnackbarProvider
      maxSnack={3}
      autoHideDuration={8000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <CustomSnackbarProvider>{children}</CustomSnackbarProvider>
    </NotistackSnackbarProvider>
  )
}

export const useSnackbarContext = (): SnackbarContext => useContext(SnackbarContext)
