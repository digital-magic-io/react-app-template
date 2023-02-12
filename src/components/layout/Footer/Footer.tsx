import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Typography } from '@mui/material'
import { FooterStyled } from './style'

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <FooterStyled>
      <Container>
        <Typography>{t('layout.footer.text')}</Typography>
      </Container>
    </FooterStyled>
  )
}
