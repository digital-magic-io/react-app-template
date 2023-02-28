import { TFunction } from 'i18next'

export type TranslationFn<T> = (value: T) => string
export type EnumTranslation<T> = (t: TFunction) => (value: T) => string
