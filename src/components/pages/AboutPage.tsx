import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@layout/Page'
import { Typography } from '@mui/material'

const AboutPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Typography variant="h1">{t('pages.about.title')}</Typography>
      <Typography>{t('pages.about.text')}</Typography>
    </Page>
  )
}

export default AboutPage
