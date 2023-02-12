/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/consistent-type-definitions */
import 'styled-components'
import { Theme } from '@mui/material/styles'
import { CustomTheme } from '@styles/theme/types'
import { ThemeMixins } from '@styles/theme/mixins'

declare module '@mui/material/styles/createTheme' {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

declare module '@mui/material/styles/createMixins' {
  interface Mixins extends ThemeMixins {}
  interface MixinOptions extends ThemeMixins {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
