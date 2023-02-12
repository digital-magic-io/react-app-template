import * as React from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { GlobalStyles } from '@styles/GlobalStyles'
import { i18n } from './i18n'
import { queryClient } from '@api/core/queryClient'
import { baseUrl } from '@src/constants/configuration'
import { AppRoutes } from './AppRoutes'
import { CssBaseline } from '@mui/material'
import { AppContextProvider, useAppContext } from '@src/context/AppContext'

// TODO: Move it to a separate component and style it
const LoadingIndicator: React.FC = () => {
  const { t } = useTranslation()
  return <div>{t('controls.loading-indicator.loading')}</div>
}

const AppWithContexts: React.FC = () => {
  const { currentTheme } = useAppContext()

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles />
      <React.Suspense fallback={<LoadingIndicator />}>
        <AppRoutes />
      </React.Suspense>
    </ThemeProvider>
  )
}

export const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={baseUrl}>
          <AppContextProvider>
            <StyledEngineProvider injectFirst>
              <AppWithContexts />
            </StyledEngineProvider>
          </AppContextProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  )
}
