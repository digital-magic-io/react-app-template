import { Controller, useFormContext } from 'react-hook-form'
import { useFormInputProps, FormInputProps } from './'
import { SelectField, SelectFieldProps, SelectValueType } from '../SelectField'

type Props<T extends SelectValueType> = FormInputProps<T> & Omit<SelectFieldProps<T>, 'name' | 'value' | 'onChange'>

export const FormSelectField = <T extends SelectValueType>(props: Props<T>): JSX.Element => {
  const f = useFormContext()
  const inputProps = useFormInputProps(props)

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
