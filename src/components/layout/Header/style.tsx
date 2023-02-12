import styled, { css } from 'styled-components'
import { AppBar } from '@mui/material'
export const HeaderStyled = styled(AppBar)(
  ({ theme }) => css`
    margin-bottom: ${theme.spacing(2)};
    a {
      text-decoration: none;
      color: inherit;

      &:hover {
        text-decoration: underline dotted;
      }
    }
    a.active {
      font-weight: bold;
    }
  `
)
