import { createGlobalStyle, css } from 'styled-components'
import * as mui from '@src/constants/mui'

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    body {
      font-family: ${theme.typography.fontFamily};
      background-color: ${theme.colors.background};
    }

    h1 {
      font-size: ${theme.fonts.title.fontSize};
      font-weight: ${theme.fonts.title.fontWeight};
    }

    h2 {
      font-size: ${theme.fonts.subtitle.fontSize};
      font-weight: ${theme.fonts.subtitle.fontWeight};
    }
    /*
    .${mui.classes.toolbar.root} {
      color: ${theme.colors.text};
      background-color: ${theme.colors.background};
    }
    
    .${mui.classes.button.root} {
      color: ${theme.colors.primary};
    }    
    */
  `}
`
