import styled, { css } from 'styled-components'

export const FooterStyled = styled.footer(
  ({ theme }) => css`
    margin-top: ${theme.spacing(2)};
    //.footer-text {
    text-align: center;
    //}
  `
)
