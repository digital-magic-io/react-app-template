import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getPath } from 'ts-object-path'
import { hasValue } from '@digital-magic/ts-common-utils'
import { propertyKeysToPath } from '@digital-magic/react-common/lib/components/controls/form/utils'
import { SelectField, SelectFieldProps, SelectValueType } from '../SelectField'
import { useFormInputProps, FormInputProps } from './'

type Props<T extends SelectValueType> = FormInputProps<T> & Omit<SelectFieldProps<T>, 'name' | 'value' | 'onChange'>

export const FormSelectField = <T extends SelectValueType>(props: Props<T>): JSX.Element => {
  const f = useFormContext()
  const inputProps = useFormInputProps(props)
  const { i18n } = useTranslation()

  React.useEffect(() => {
    const name = propertyKeysToPath(getPath(props.name))
    if (f.getFieldState(name).isDirty && hasValue(inputProps.error)) {
      void f.trigger(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

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
