import * as React from 'react'
import { Container } from '@mui/material'
import { PageStyled } from './style'
import { Footer } from '../Footer'
import { Header } from '../Header'

export type Props = Readonly<{
  showHeader?: boolean
  showFooter?: boolean
}> &
  React.PropsWithChildren

export const Page: React.FC<Props> = ({ showHeader, showFooter, children }) => {
  return (
    <PageStyled>
      {showHeader !== false && <Header />}
      <Container>
        <main>{children}</main>
      </Container>
      {showFooter !== false && <Footer />}
    </PageStyled>
  )
}
