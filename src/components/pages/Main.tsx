import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'
import { Page } from '@layout/Page'

const Main: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '80vh', border: '1px solid #9eff49' }}>
        <Grid item container height={600} border="1px solid grey" mx={3}>
          <Grid item xs={6} bgcolor="#d6fff9">
            <Typography color="black" p={3}>
              {t('pages.main.title')}
            </Typography>
          </Grid>
          <Grid item xs={6} bgcolor="#e481ff">
            <Typography color="black" p={3}>
              {t('pages.main.text')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  )
}

export default Main
