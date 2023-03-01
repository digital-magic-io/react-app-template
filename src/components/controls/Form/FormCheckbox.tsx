import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getPath } from 'ts-object-path'
import { hasValue } from '@digital-magic/ts-common-utils'
import { propertyKeysToPath } from '@digital-magic/react-common/lib/components/controls/form/utils'
import { FormControl, FormHelperText } from '@mui/material'
import { Checkbox, CheckboxProps } from '../Checkbox'
import { useFormInputProps, FormInputProps } from './'

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
  const { i18n } = useTranslation()

  React.useEffect(() => {
    const name = propertyKeysToPath(getPath(props.name))
    if (f.getFieldState(name).isDirty && hasValue(error)) {
      void f.trigger(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

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
