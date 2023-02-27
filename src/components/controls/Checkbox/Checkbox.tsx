import React from 'react'
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@mui/material'
import { CheckboxStyled } from './style'
import { CheckIcon } from './CheckIcon'

export type CheckboxProps = MuiCheckboxProps &
  Readonly<{
    label: string
  }>

export const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>(({ label, ...props }, ref) => {
  return (
    <CheckboxStyled
      control={
        <MuiCheckbox
          {...props}
          disableRipple
          checkedIcon={
            <div className="checkbox-icon checked">
              <CheckIcon />
            </div>
          }
          icon={<div className="checkbox-icon unchecked" />}
        />
      }
      label={label}
      ref={ref}
    />
  )
})
