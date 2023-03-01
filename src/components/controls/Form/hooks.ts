import * as z from 'zod'
import { FieldValues, get, useFormContext as useNativeFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
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
import {
  useFormTypedBasic,
  UseFormTypedOptions,
  UseFormTypedResult
} from '@digital-magic/react-common/lib/components/controls/form'
import { errorMap } from './errorMap'

export const useFormContext = <T extends FieldValues>(): UseFormContextResult<T> => ({
  ...useNativeFormContext<T>(),
  names: createProxy<DeepRequired<T>>()
})

export const useFormTyped = <T extends FieldValues>(
  opts: Omit<UseFormTypedOptions<T>, 'errorMap'>
): UseFormTypedResult<T> => {
  const { t } = useTranslation()

  return useFormTypedBasic({ ...opts, errorMap: errorMap(t) })
}

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

export const useFormInputProps = <T>(props: FormInputProps<T>): UseFormInputPropsResult => {
  const name = propertyKeysToPath(getPath(props.name))
  const error = useFormErrorMessage(name)

  return {
    name,
    error: hasValue(error),
    helperText: error
  }
}
