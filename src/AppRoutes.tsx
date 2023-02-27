import * as React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { useAuthentication } from '@hooks/useAuthentication'
import { RouteObject } from 'react-router/dist/lib/context'
import { routes } from '@constants/routes'

const LoginPage = React.lazy(() => import('./components/pages/Login'))
const MainPage = React.lazy(() => import('./components/pages/Main'))
const AboutPage = React.lazy(() => import('./components/pages/About'))

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthentication()

  const publicRoutes: Array<RouteObject> = React.useMemo(
    () => [
      {
        path: routes.Login,
        element: <LoginPage />
      },
      {
        path: '*',
        element: <Navigate to={routes.Login} />
      }
    ],
    []
  )
  const privateRoutes: Array<RouteObject> = React.useMemo(
    () => [
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
    ],
    []
  )

  const currentRoutes: Array<RouteObject> = React.useMemo(
    () => (isAuthenticated ? privateRoutes : publicRoutes),
    [isAuthenticated, privateRoutes, publicRoutes]
  )

  return useRoutes(currentRoutes)
}
