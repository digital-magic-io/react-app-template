import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { UserLanguage } from '@model/language'
import { LogoutReason } from '@model/auth'
import { TranslationFn } from './types'
import { languageTranslation, logoutReasonTranslation } from './utils'

type HookResult = {
  languageTranslation: TranslationFn<UserLanguage>
  logoutReasonTranslation: TranslationFn<LogoutReason>
}

export const useEnumTranslation = (): HookResult => {
  const { i18n, t } = useTranslation()

  return React.useMemo(
    () => ({
      languageTranslation: languageTranslation(t),
      logoutReasonTranslation: logoutReasonTranslation(t)
    }),
    // TODO: Can we achieve correct memoization without breading eslint rule?
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n, t]
  )
}
