import { LanguageConfiguration } from '@constants/configuration'
import { arrayIncludes } from '@digital-magic/ts-common-utils'
import { UserLanguage } from './common'

export type AvailableLanguage = (typeof LanguageConfiguration.availableLanguages)[number]

export const language = (lang: string): UserLanguage => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (arrayIncludes(LanguageConfiguration.availableLanguages, lang)) {
    switch (lang) {
      case 'en':
        return UserLanguage.enum.en
      case 'ru':
        return UserLanguage.enum.ru
      default:
        return UserLanguage.enum.et
    }
  } else {
    // This code ensures that english is present in both availableLanguage & defaultLanguage configurations
    const en: AvailableLanguage = 'en'
    if (!LanguageConfiguration.defaultLanguage.includes(en)) {
      console.error(
        'Fallback language is not defined in languages list for i18n configuration: ',
        LanguageConfiguration.defaultLanguage
      )
    }
    return UserLanguage.enum.en
  }
}
