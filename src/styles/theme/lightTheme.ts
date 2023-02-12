import { blue, brown } from '@mui/material/colors'
import { commonColors } from './colors'
import { buildCustomTheme } from '@styles/theme/buildCustomTheme'
import { CustomTheme } from '@styles/theme/types'

export const lightTheme: CustomTheme = buildCustomTheme('light', {
  background: commonColors.white,
  body: commonColors.black,
  title: commonColors.black,
  subtitle: commonColors.black,
  text: commonColors.black,
  smallText: commonColors.grey700,
  primary: blue['900'],
  secondary: brown['900']
})
