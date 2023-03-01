import * as React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import { useAuthStore } from '@stores/useAuthStore'
import { RouteObject } from 'react-router/dist/lib/context'
import { routes } from '@constants/routes'

const LoginPage = React.lazy(() => import('@pages/LoginPage'))
const MainPage = React.lazy(() => import('@pages/MainPage'))
const AboutPage = React.lazy(() => import('@pages/AboutPage'))
const UsersPage = React.lazy(() => import('@pages/Users/UsersPage'))
const UserPage = React.lazy(() => import('@pages/Users/UserPage'))
const SignUpPage = React.lazy(() => import('@pages/Users/SignUpPage'))

export const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuthStore()

	const sharedRoutes: Array<RouteObject> = React.useMemo(
    () => [
      {
        path: routes.Index,
        element: <MainPage />
      },
      {
        path: routes.About,
        element: <AboutPage />
      },
    ],
    []
  )
  const publicRoutes: Array<RouteObject> = React.useMemo(
    () => [
			...sharedRoutes,
      {
        path: routes.Login,
        element: <LoginPage />
      },
      {
        path: '*',
        element: <Navigate to={routes.Login} />
      },
			{
        path: routes.SignUp,
        element: <SignUpPage />
      }
    ],
    [sharedRoutes]
  )
  const privateRoutes: Array<RouteObject> = React.useMemo(
    () => [
			...sharedRoutes,
      {
        path: routes.Users,
        element: <UsersPage />
      },
      {
        path: routes.UserNew,
        element: <UserPage />
      },
      {
        path: routes.UserEdit,
        element: <UserPage />
      },
      {
        path: '*',
        element: <Navigate to={routes.Index} />
      }
    ],
    [sharedRoutes]
  )

  const currentRoutes: Array<RouteObject> = React.useMemo(
    () => (isAuthenticated ? privateRoutes : publicRoutes),
    [isAuthenticated, privateRoutes, publicRoutes]
  )

  return useRoutes(currentRoutes)
}
