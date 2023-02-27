import * as React from 'react'
import * as z from 'zod'
import { useValidatedLocalStorage } from '@digital-magic/react-common/lib/storage'
import { defaultTheme, themeStorageKey } from '@constants/configuration'
import { CustomTheme, type ThemeType } from '@styles/theme/types'
import { darkTheme } from '@styles/theme/darkTheme'
import { lightTheme } from '@styles/theme/lightTheme'

export type AppContext = {
  currentTheme: CustomTheme
  switchTheme: React.Dispatch<React.SetStateAction<ThemeType>>
  //currentLanguage:
}

export const AppContext = React.createContext({} as AppContext)
const themes: ReadonlyArray<ThemeType> = ['light', 'dark']
const ThemeType = z.enum([themes[0], themes[1]])

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [themeType, setThemeType] = useValidatedLocalStorage(themeStorageKey, defaultTheme, ThemeType)

  const currentTheme: CustomTheme = React.useMemo(() => {
    switch (themeType) {
      case ThemeType.enum.dark:
        return darkTheme
      default:
        return lightTheme
    }
  }, [themeType])

  return <AppContext.Provider value={{ currentTheme, switchTheme: setThemeType }}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContext => React.useContext(AppContext)
