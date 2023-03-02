import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { SelectField, SelectFieldProps, SelectValueType } from '../SelectField'
import { useFormInputProps, FormInputProps, useRevalidateFieldOnLanguageChange } from './'

type Props<T extends SelectValueType> = FormInputProps<T> & Omit<SelectFieldProps<T>, 'name' | 'value' | 'onChange'>

export const FormSelectField = <T extends SelectValueType>(props: Props<T>): JSX.Element => {
  const f = useFormContext()
  const inputProps = useFormInputProps(props)

  useRevalidateFieldOnLanguageChange(props.name, f)

  return (
    <Controller
      name={inputProps.name}
      control={f.control}
      render={({ field }) => (
        <SelectField
          MenuProps={{ disableScrollLock: true, ...props.MenuProps }}
          {...props}
          {...inputProps}
          {...field}
        />
      )}
    />
  )
}
