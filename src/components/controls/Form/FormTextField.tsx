import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { HtmlInputChangeEventHandler } from '@digital-magic/react-common'
import { TextField, TextFieldProps } from '@mui/material'
import { FormInputProps, useFormInputProps, useRevalidateFieldOnLanguageChange } from './'

type Props = FormInputProps<string | number> & Omit<TextFieldProps, 'name' | 'value' | 'onChange'>

export const FormTextField: React.FC<Props> = (props) => {
  const f = useFormContext()
  const inputProps = useFormInputProps(props)

  useRevalidateFieldOnLanguageChange(props.name, f)

  const transformValue = (value: string | number): string | number | undefined => {
    if (typeof value === 'string' && value.length > 0) {
      if (props.type === 'number') {
        const numberValue = Number(value)

        if (!isNaN(numberValue)) {
          return numberValue
        }
      }

      return value
    }

    if (typeof value === 'number' && !isNaN(value) && props.type === 'number') {
      return value
    }

    return undefined
  }

  const setValueAs =
    (changeHandler: (value: string | number | undefined) => void): HtmlInputChangeEventHandler =>
    (e): void => {
      const value = e.target.value

      changeHandler(transformValue(value))
    }

  return (
    <Controller
      control={f.control}
      name={inputProps.name}
      render={({ field }) => (
        <TextField
          {...props}
          {...inputProps}
          {...field}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={transformValue(field.value) ?? ''}
          onChange={setValueAs(field.onChange)}
          inputProps={props.inputProps}
        />
      )}
    />
  )
}
