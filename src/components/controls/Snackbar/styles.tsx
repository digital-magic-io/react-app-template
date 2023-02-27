import styled, { css } from 'styled-components'

export const SnackbarStyled = styled('div')(
  ({ theme }) => css`
    background: ${theme.colors.background};
    color: ${theme.palette.error.main};
    border: 2px solid ${theme.palette.error.main};
    padding: ${theme.spacing(2)};
  `
)
