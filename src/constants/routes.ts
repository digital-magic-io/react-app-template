const usersRoute = '/users'

export const routes = {
  Index: '/',
  About: '/about',
  Users: usersRoute,
  UserNew: `${usersRoute}/new`,
  UserEdit: `${usersRoute}/:username`,
  Login: '/login',
  SignUp: '/signup'
} as const
