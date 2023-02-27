import { FormControlLabel } from '@mui/material'
import styled, { css } from 'styled-components'

export const CheckboxStyled = styled(FormControlLabel)`
  ${({ theme }) => css`
    input[type='checkbox'] + svg {
      color: ${theme.palette.primary.main};
    }

    .MuiCheckbox-root:hover {
      background: transparent;
    }
  `}
`
