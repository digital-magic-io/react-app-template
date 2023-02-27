import { getWindowProperty } from '@digital-magic/react-common/lib/utils/window'
import { ThemeType } from '@styles/theme/types'
import { UserLanguage } from '@model/common'
//import { LanguageConfiguration } from '@digital-magic/react-common/lib/i18n'

// Versions and paths
export const appVersion = process.env.REACT_APP_VERSION ?? '0.0.0'
export const baseUrl = process.env.PUBLIC_URL ?? ''
export const apiBaseUrl = getWindowProperty('REACT_APP_API_BASE_URL') ?? ''
export const apiBaseUrlV1 = `${apiBaseUrl}/v1`

console.log(`Initialized with params: APP_VERSION=${appVersion}, BASE_URL=${baseUrl}, API_BASE_URL=${apiBaseUrl}`)

// Formatting
export const dateFormat = 'yyyy-MM-dd'
export const timeFormat = 'HH:mm'
export const dateTimeShortFormat = `${dateFormat} ${timeFormat}`
export const dateTimeFullFormat = `yyyy-MM-dd ${timeFormat}`
export const priceCurrency = 'EUR'

// Other
const storagePrefix = 'react-app-dm-template'
export const themeStorageKey = `${storagePrefix}selected-theme`

export const defaultTheme: ThemeType = 'light'

// TODO: Remove it
export type LanguageConfiguration = {
  translationNamespace: string
  loadPath: string
  version: string
  availableLanguages: ReadonlyArray<string>
  defaultLanguage: ReadonlyArray<string>
  storageKey: string
  cacheStorageKeyPrefix: string
  cacheExpirationMs: number
}

export const LanguageConfiguration: LanguageConfiguration = {
  translationNamespace: 'translations',
  loadPath: `${baseUrl}/locales/{{lng}}/{{ns}}.json?v=${appVersion}`, // add app version so file is not cached
  version: appVersion,
  availableLanguages: [UserLanguage.enum.en, UserLanguage.enum.et, UserLanguage.enum.ru] as const,
  defaultLanguage: [UserLanguage.enum.et, UserLanguage.enum.en, UserLanguage.enum.ru] as const,
  storageKey: `${storagePrefix}_i18nextLng`,
  cacheStorageKeyPrefix: `${storagePrefix}_i18next_res_`,
  cacheExpirationMs: process.env.NODE_ENV === 'production' ? 7 * 24 * 60 * 60 * 1000 : 60 * 1000
}
