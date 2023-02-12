import styled, { css } from 'styled-components'

export const PageStyled = styled('div')(
  () => css`
    height: 100vh;
    width: 100vw;

    main {
      overflow: hidden;
    }
  `
)
