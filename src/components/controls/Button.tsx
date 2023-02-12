import * as React from 'react'
import { ButtonProps as MuiButtonProps, Button as MuiButton } from '@mui/material'
import { LinkProps, useNavigate } from 'react-router-dom'
import { HtmlMouseButtonEventHandler } from '@digital-magic/react-common'
import { hasValue } from '@digital-magic/ts-common-utils'

// There is any combination for props 'to', 'href', 'onClick' is possible (even no any is set), no need to restrict.
export type ButtonProps = MuiButtonProps & {
  to?: LinkProps['to'] & { state?: unknown }
}

export const Button: React.FC<ButtonProps> = ({ to, onClick, children, ...props }) => {
  const navigate = useNavigate()

  const onClickHandler: HtmlMouseButtonEventHandler = (e) => {
    if (hasValue(to)) {
      if (typeof to === 'string') {
        navigate(to)
      } else {
        const { state, ...restTo } = to

        navigate(restTo, { state })
      }
    }
    if (hasValue(onClick)) {
      onClick(e)
    }
  }

  return (
    <MuiButton {...props} disabled={props.disabled} onClick={onClickHandler}>
      {children}
    </MuiButton>
  )
}
