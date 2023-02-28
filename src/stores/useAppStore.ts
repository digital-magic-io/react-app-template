import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { Handler } from '@digital-magic/ts-common-utils'
import { ThemeType } from '@styles/theme/types'
import { appStorageKey, defaultTheme } from '@constants/configuration'

export type State = Readonly<{
  themeType: ThemeType
}>

export type Actions = Readonly<{
  setThemeType: Handler<ThemeType>
}>

export const useAppStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        themeType: defaultTheme,
        setThemeType: (theme) => set(() => ({ themeType: theme }))
      }),
      {
        name: appStorageKey,
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)
