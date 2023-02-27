import styled, { css } from 'styled-components'
import { FormControl } from '@mui/material'

export const SelectFieldStyled = styled(FormControl)(
  ({ theme }) => css`
    font-family: ${theme.typography.fontFamily};

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      transition: background-color 5000s ease-in-out 0s;
    }
  `
)
