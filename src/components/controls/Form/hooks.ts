import * as z from 'zod'
import { FieldValues, get, useFormContext as useNativeFormContext } from 'react-hook-form'
import { createProxy, getPath } from 'ts-object-path'
import { hasValue } from '@digital-magic/ts-common-utils'
import { zodIs } from '@digital-magic/react-common/lib/utils/zod'
import {
  DeepRequired,
  FieldError,
  FormInputProps,
  UseFormContextResult,
  UseFormInputPropsResult
} from '@digital-magic/react-common/lib/components/controls/form/types'
import { propertyKeysToPath } from '@digital-magic/react-common/lib/components/controls/form/utils'
//import { useFormInputProps, useFormErrorMessage } from '@digital-magic/react-common/lib/components/controls/form/hooks'

// TODO: Why it doesn't work if imported from another project?
export const useFormContext = <T extends FieldValues>(): UseFormContextResult<T> => ({
  ...useNativeFormContext<T>(),
  names: createProxy<DeepRequired<T>>()
})

// TODO: Why it doesn't work if imported from another project?
export const useFormErrorMessage = (name: string): string | undefined => {
  const f = useFormContext()

  // eslint-disable-next-line functional/no-let
  let err: unknown = get(f.formState.errors, name)

  if (zodIs(err, z.record(FieldError))) {
    const key = Object.keys(err)[0]
    err = err[key]
  }

  return zodIs(err, FieldError) ? err.message : undefined
}

// TODO: Why it doesn't work if imported from another project?
export const useFormInputProps = <T>(props: FormInputProps<T>): UseFormInputPropsResult => {
  const name = propertyKeysToPath(getPath(props.name))
  const error = useFormErrorMessage(name)

  return {
    name,
    error: hasValue(error),
    helperText: error
  }
}
