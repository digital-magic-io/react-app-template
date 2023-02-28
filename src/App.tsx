import * as React from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from '@styles/GlobalStyles'
import { queryClient } from '@api/queryClient'
import { i18n } from './i18n'
import { baseUrl } from '@constants/configuration'
import { AppRoutes } from './AppRoutes'
import { SnackbarProvider } from '@context/SnackbarContext'
import { useTheme } from '@hooks/useTheme'

// TODO: Move it to a separate component and style it
const LoadingIndicator: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('controls.loading-indicator.loading')}</div>
}

const AppWithContexts: React.FC = () => {
  const { currentTheme } = useTheme()

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles />
      <SnackbarProvider>
        <React.Suspense fallback={<LoadingIndicator />}>
          <AppRoutes />
        </React.Suspense>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={baseUrl}>
          <StyledEngineProvider injectFirst>
            <AppWithContexts />
          </StyledEngineProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
