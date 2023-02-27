import * as z from 'zod'
import { TFunction } from 'i18next'

export const errorMap =
  (t: TFunction): z.ZodErrorMap =>
  (error, ctx): { message: string } => {
    // eslint-disable-next-line functional/no-let
    let message: string | undefined | null = undefined

    // if more error translations are needed, add cases for them here
    // example: https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md#customizing-errors-with-zoderrormap
    switch (error.code) {
      case 'invalid_string':
        if (error.validation === 'email') {
          message = t('global.form_errors.invalid_email')
        }
        break
      case 'invalid_type':
        if (error.received === 'undefined') {
          message = t('global.form_errors.required')
        } else {
          message = t('global.form_errors.invalid_type')
        }
        break
      case 'too_small':
        if (error.type === 'string') {
          if (error.minimum === 1) {
            message = t('global.form_errors.required')
          } else {
            message = t('global.form_errors.min_str_len', { minLength: error.minimum })
          }
        }
        break
      case 'too_big':
        if (error.type === 'string') {
          message = t('global.form_errors.max_str_len', { maxLength: error.maximum })
        }
        break
      case 'custom':
        // TODO: Add custom errors handling
        break
      default:
        break
      /*
        // TODO: Complete implementation for every type of errors
        case "invalid_union": { throw new Error('Not implemented yet: "invalid_union" case') }
        case "unrecognized_keys": { throw new Error('Not implemented yet: "unrecognized_keys" case') }
        case "invalid_enum_value": { throw new Error('Not implemented yet: "invalid_enum_value" case') }
        case "invalid_arguments": { throw new Error('Not implemented yet: "invalid_arguments" case') }
        case "invalid_return_type": { throw new Error('Not implemented yet: "invalid_return_type" case') }
        case "not_multiple_of": { throw new Error('Not implemented yet: "not_multiple_of" case') }
        case "invalid_intersection_types": { throw new Error('Not implemented yet: "invalid_intersection_types" case') }
        case "invalid_date": { throw new Error('Not implemented yet: "invalid_date" case') }
        */
    }

    return message ? { message } : z.defaultErrorMap(error, ctx)
  }
