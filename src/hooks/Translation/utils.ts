import { UserLanguage } from '@model/language'
import { LogoutReason } from '@model/auth'
import { EnumTranslation } from './types'

export const languageTranslation: EnumTranslation<UserLanguage> = (t) => (lang) => {
  switch (lang) {
    case 'et':
      return t('enums.language.et')
    case 'ru':
      return t('enums.language.ru')
    case 'en':
      return t('enums.language.en')
  }
}

export const logoutReasonTranslation: EnumTranslation<LogoutReason> = (t) => (reason) => {
  switch (reason) {
    case 'InvalidLogin':
      return t('pages.login.errors.InvalidLogin')
    case 'SignedOut':
      return t('pages.login.errors.SignedOut')
    case 'TimedOut':
      return t('pages.login.errors.TimedOut')
  }
}
