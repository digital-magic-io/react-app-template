import { createTheme } from '@mui/material/styles'
import { CustomTheme, ThemeColors, ThemeType } from './types'
import { mixins } from './mixins'

export const buildCustomTheme = (type: ThemeType, colors: ThemeColors): CustomTheme =>
  createTheme({
    type: type,
    mixins,
    palette: {
      mode: type,
      primary: {
        main: colors.primary
      },
      secondary: {
        main: colors.secondary
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true
        },
        styleOverrides: {
          root: { padding: 0 }
        }
      }
    },
    typography: {
      fontSize: 16,
      fontFamily: 'Montserrat, Roboto, sans-serif'
    },
    fonts: {
      bold: 700,
      medium: 500,
      regular: 400,
      title: {
        fontSize: 22,
        fontWeight: 'bold'
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'medium'
      },
      text: {
        fontSize: 16,
        fontWeight: 'normal'
      },
      smallText: {
        fontSize: 12,
        fontWeight: 'normal'
      }
    },
    colors
  })
