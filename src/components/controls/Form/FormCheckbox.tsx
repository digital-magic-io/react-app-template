import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { hasValue } from '@digital-magic/ts-common-utils'
import { FormControl, FormHelperText } from '@mui/material'
import { Checkbox, CheckboxProps } from '../Checkbox'
import {useFormInputProps, FormInputProps, useRevalidateAtLanguageChange} from './'

type Props<T = boolean> = FormInputProps<T> &
  Omit<CheckboxProps, 'name' | 'value' | 'onChange' | 'checked'> &
  Readonly<{
    hideErrorMessage?: boolean
    value?: T
  }>

export const FormCheckbox: React.FC<Props> = ({ className, ...props }) => {
  const f = useFormContext()
  const { name, error, helperText } = useFormInputProps(props)
  const { hideErrorMessage, ...inputProps } = props

  useRevalidateAtLanguageChange(props.name, f)

  return (
    <FormControl component="fieldset" error={error} className={className}>
      <Controller
        name={name}
        control={f.control}
        render={({ field }) => {
          const checked = Boolean(field.value)
          return (
            <Checkbox {...inputProps} {...field} checked={checked} onChange={(e) => field.onChange(e.target.checked)} />
          )
        }}
      />
      {hideErrorMessage !== true && hasValue(helperText) && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  )
}
