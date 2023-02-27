import React from 'react'
import { SnackbarStyled } from './styles'

export type SnackbarProps = Readonly<{
  message: React.ReactNode
  onClose?: () => void
}>

export const Snackbar = React.forwardRef(
  ({ message, onClose }: SnackbarProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    return (
      <SnackbarStyled onClick={onClose} ref={ref}>
        {message}
      </SnackbarStyled>
    )
  }
)
