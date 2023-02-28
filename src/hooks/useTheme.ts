import * as React from 'react'
import { Handler } from '@digital-magic/ts-common-utils'
import { CustomTheme, ThemeType } from '@styles/theme/types'
import { useAppStore } from '@stores/useAppStore'
import { darkTheme } from '@styles/theme/darkTheme'
import { lightTheme } from '@styles/theme/lightTheme'

type HookResult = {
  currentTheme: CustomTheme
  switchTheme: Handler<ThemeType>
}

const themeByType = (themeType: ThemeType): CustomTheme => {
  switch (themeType) {
    case 'dark':
      return darkTheme
    default:
      return lightTheme
  }
}

export const useTheme = (): HookResult => {
  // TODO: Add possibility to define default value here (lazily)
  const { themeType, setThemeType } = useAppStore()

  const currentTheme = React.useMemo(() => themeByType(themeType), [themeType])

  return { currentTheme, switchTheme: setThemeType }
}
