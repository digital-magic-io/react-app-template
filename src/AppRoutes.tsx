import * as React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { routes } from '@src/constants/routes'

const MainPage = React.lazy(() => import('./components/pages/Main'))
const AboutPage = React.lazy(() => import('./components/pages/About'))

export const AppRoutes: React.FC = () => {
  return useRoutes([
    {
      path: routes.Index,
      element: <MainPage />
    },
    {
      path: routes.About,
      element: <AboutPage />
    },
    {
      path: '*',
      element: <Navigate to={routes.Index} />
    }
  ])
}
