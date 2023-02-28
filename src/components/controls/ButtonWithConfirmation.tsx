import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { HtmlMouseButtonEventHandler } from '@digital-magic/react-common'
import { Button, ButtonProps } from './Button'

type DialogButtonProps = Pick<ButtonProps, 'onClick' | 'color'> &
  Readonly<{
    text: string
  }>

const DialogButton: React.FC<DialogButtonProps> = ({ color, text, onClick }) => (
  <Button color={color} onClick={onClick}>
    {text}
  </Button>
)

const ConfirmButton: React.FC<Pick<DialogButtonProps, 'onClick'>> = ({ onClick }) => {
  const { t } = useTranslation()
  return <DialogButton color="success" text={t('global.buttons.yes')} onClick={onClick} />
}

const CancelButton: React.FC<Pick<DialogButtonProps, 'onClick'>> = ({ onClick }) => {
  const { t } = useTranslation()
  return <DialogButton color="error" text={t('global.buttons.no')} onClick={onClick} />
}

export type DeleteButtonProps = ButtonProps & {
  confirmTitle?: string | undefined
  confirmMessage: string | undefined
  onConfirmResult?: (result: boolean) => void
}

export const ButtonWithConfirmation: React.FC<Omit<DeleteButtonProps, 'onClick'>> = ({
  confirmTitle,
  confirmMessage,
  onConfirmResult,
  children,
  ...buttonProps
}) => {
  const [dialogVisible, setDialogVisible] = React.useState(false)

  const handleClose: (value: boolean) => React.MouseEventHandler = (value) => (e) => {
    e.stopPropagation()
    setDialogVisible(false)
    if (onConfirmResult) {
      onConfirmResult(value)
    }
  }

  const handleOnClick: HtmlMouseButtonEventHandler = (e) => {
    e.stopPropagation()
    setDialogVisible(true)
  }

  return (
    <>
      <Button {...buttonProps} onClick={handleOnClick}>
        {children}
      </Button>
      <Dialog open={dialogVisible} onClose={handleClose(false)} aria-labelledby="modal-title">
        {confirmTitle && <DialogTitle id="modal-title">{confirmTitle}</DialogTitle>}
        <DialogContent>{confirmMessage}</DialogContent>
        <DialogActions>
          <ConfirmButton onClick={handleClose(true)} />
          <CancelButton onClick={handleClose(false)} />
        </DialogActions>
      </Dialog>
    </>
  )
}
