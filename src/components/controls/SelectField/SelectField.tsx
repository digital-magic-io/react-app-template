import * as React from 'react'
import { hasValue } from '@digital-magic/ts-common-utils'
import { FormHelperText, MenuItem, Select, SelectProps } from '@mui/material'
import { SelectFieldStyled } from './styles'

export type SelectValueType = string | number

export type ValueLabel<T> = Readonly<{
  label: React.ReactNode
  value: T
}>

export type SelectFieldProps<T> = SelectProps &
  Readonly<{
    options: ReadonlyArray<ValueLabel<T>>
    helperText?: string
  }>

const placeholderValue = ''

export const SelectField = React.forwardRef(
  <T extends SelectValueType>(
    { className, placeholder, error, helperText, ...props }: SelectFieldProps<T>,
    ref: React.ForwardedRef<unknown>
  ) => {
    const value = props.value || placeholderValue

    // TODO: Shouldn't user define variant in properties?
    return (
      <SelectFieldStyled className={className} fullWidth={props.fullWidth}>
        <Select variant="outlined" {...props} value={value} ref={ref}>
          {hasValue(placeholder) && (
            <MenuItem value={placeholderValue} disabled>
              {placeholder}
            </MenuItem>
          )}
          {props.options.map((o, index) => (
            <MenuItem key={index} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </SelectFieldStyled>
    )
  }
)
