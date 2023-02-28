import { UserLanguage } from '@model/language'
import { LogoutReason, UserRole } from '@model/auth'
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

export const roleTranslation: EnumTranslation<UserRole> = (t) => (role) => {
  switch (role) {
    case 'Admin':
      return t('enums.userRoles.Admin')
    case 'User':
      return t('enums.userRoles.User')
  }
}

export const logoutReasonTranslation: EnumTranslation<LogoutReason> = (t) => (reason) => {
  switch (reason) {
    case 'InvalidLogin':
      return t('enums.logoutReasons.InvalidLogin')
    case 'SignedOut':
      return t('enums.logoutReasons.SignedOut')
    case 'TimedOut':
      return t('enums.logoutReasons.TimedOut')
  }
}
