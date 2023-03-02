import * as React from 'react'
import * as z from 'zod'
import { FieldValues, get, UseFormReturn, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { createProxy, getPath, ObjProxyArg } from 'ts-object-path'
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

export const useFormContextTyped = <T extends FieldValues>(): UseFormContextResult<T> => ({
  ...useFormContext<T>(),
  names: createProxy<DeepRequired<T>>()
})

export const useFormTyped = <T extends FieldValues>(
  opts: Omit<UseFormTypedOptions<T>, 'errorMap'>
): UseFormTypedResult<T> => {
  const { t } = useTranslation()

  return useFormTypedBasic({ ...opts, errorMap: errorMap(t) })
}

export const useFormErrorMessage = (name: string): string | undefined => {
  const f = useFormContextTyped()

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

// have the field helper text re-generate as a result of a language change
export function useRevalidateFieldOnLanguageChange<T>(name: ObjProxyArg<T, T>, form: UseFormReturn): void {
  const { i18n } = useTranslation()
  React.useEffect(() => {
    const fieldName = propertyKeysToPath(getPath(name))
    if (undefined !== get(form.formState.errors, fieldName)) {
      void form.trigger(fieldName)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language])
}
