import { blue, brown } from '@mui/material/colors'
import { CustomTheme } from '@styles/theme/types'
import { commonColors } from './colors'
import { buildCustomTheme } from '@styles/theme/buildCustomTheme'

export const darkTheme: CustomTheme = buildCustomTheme('dark', {
  background: commonColors.black,
  body: commonColors.white,
  title: commonColors.white,
  subtitle: commonColors.white,
  text: commonColors.white,
  smallText: commonColors.grey400,
  primary: blue['300'],
  secondary: brown['300']
})
