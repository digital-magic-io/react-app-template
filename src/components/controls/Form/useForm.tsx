import { FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { errorMap } from './errorMap'
import {
  useForm as useFormBasic,
  UseFormOptions as UseBasicFormOptions,
  UseFormResult
} from '@digital-magic/react-common/lib/components/controls/form'

export type UseFormOptions<T extends FieldValues> = Omit<UseBasicFormOptions<T>, 'errorMap'>

export const useForm = <T extends FieldValues>(opts: UseFormOptions<T>): UseFormResult<T> => {
  const { t } = useTranslation()
  return useFormBasic({ ...opts, errorMap: errorMap(t) })
}
