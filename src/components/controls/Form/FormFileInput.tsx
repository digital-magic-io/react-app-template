import * as React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { getPath } from 'ts-object-path'
import { hasValue, isEmpty } from '@digital-magic/ts-common-utils'
import { propertyKeysToPath } from '@digital-magic/react-common/lib/components/controls/form/utils'
import { HtmlInputChangeEventHandler } from '@digital-magic/react-common'
import { FormHelperText } from '@mui/material'
import { useFormInputProps, FormInputProps } from './'

type FormFileInputProps = FormInputProps<FileList> &
  Omit<React.HTMLProps<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'type'>

export const FormFileInput: React.FC<FormFileInputProps> = (props) => {
  const f = useFormContext()
  const inputProps = useFormInputProps(props)
  const { i18n } = useTranslation()

  // eslint-disable-next-line functional/prefer-tacit
  const id: string = React.useId()

  React.useEffect(() => {
    const name = propertyKeysToPath(getPath(props.name))
    if (f.getFieldState(name).isDirty && hasValue(inputProps.error)) {
      void f.trigger(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])

  const handleChange =
    (changeHandler: (value: FileList | undefined) => void): HtmlInputChangeEventHandler =>
    (e) => {
      changeHandler(e.target.files ?? undefined)
    }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const formValue: FileList | undefined = f.watch(inputProps.name)

  // TODO: A dirty hack to reset field to empty state
  React.useEffect(() => {
    const nativeElement = document.getElementById(id) as HTMLInputElement
    if (isEmpty(formValue)) {
      // eslint-disable-next-line functional/immutable-data
      nativeElement.value = ''
    } /* else {
      const event = new CustomEvent('input', { bubbles: true })
      Object.defineProperty(event, 'target', { writable: false, value: { files: formValue } })
      if (nativeElement.onchange !== null) {
        nativeElement.onchange(event)
      }
    }*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValue])

  return (
    <Controller
      control={f.control}
      name={inputProps.name}
      render={({ field }) => (
        <>
          <input
            id={id}
            {...props}
            name={field.name}
            ref={field.ref}
            onChange={handleChange(field.onChange)}
            type="file"
          />
          {inputProps.helperText && <FormHelperText error={inputProps.error}>{inputProps.helperText}</FormHelperText>}
        </>
      )}
    />
  )
}
