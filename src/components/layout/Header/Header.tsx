import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom'
import { TFunction } from 'i18next'
import { hasValue } from '@digital-magic/ts-common-utils'
import { controlClassName, HtmlMouseButtonEventHandler, HtmlMouseEventHandler } from '@digital-magic/react-common'
import { routes } from '@constants/routes'
import { UserLanguage } from '@model/language'
import { useAuthStore } from '@stores/useAuthStore'
import { useAuthentication } from '@hooks/useAuthentication'
import { useTheme } from '@hooks/useTheme'
import { useEnumTranslation } from '@hooks/Translation/useEnumTranslation'
import { Box, Container, IconButton, MenuItem, Toolbar, Typography } from '@mui/material'
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material'
import { Link } from '@controls/Link'
import { Button } from '@controls/Button'
import { HeaderStyled } from './style'
import { MenuTrigger } from '@controls/Menu/MenuTrigger'

type MenuItemProps = {
  title: ReturnType<TFunction>
  to: NavLinkProps['to']
}

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation()
  const { currentTheme, switchTheme } = useTheme()
  const displayName = useAuthStore((state) => state.auth?.displayName)
  const { logout } = useAuthentication()
  const navigate = useNavigate()
  const { languageTranslation } = useEnumTranslation()

  const handleSwitchThemeClick: HtmlMouseButtonEventHandler = (e) => {
    e.preventDefault()
    switchTheme(currentTheme.type === 'light' ? 'dark' : 'light')
  }

  const handleMenuItemClick: (to: NavLinkProps['to']) => HtmlMouseEventHandler = (to) => (e) => {
    e.preventDefault()
    navigate(to)
  }

  const handleLanguageClick: (lang: UserLanguage) => HtmlMouseEventHandler = (lang) => (e) => {
    e.preventDefault()
    void i18n.changeLanguage(lang)
  }

  const handleLogoutClick: HtmlMouseButtonEventHandler = (e) => {
    e.preventDefault()
    logout()
  }

  const menuItems: ReadonlyArray<MenuItemProps> = React.useMemo(
    () => [
      {
        title: t('layout.header.menu.items.home'),
        to: routes.Index
      },
      {
        title: t('layout.header.menu.items.about'),
        to: routes.About
      },
      {
        title: t('layout.header.menu.items.users'),
        to: routes.Users
      }
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  )

  return (
    <HeaderStyled position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <Link to={routes.Index}>{t('app.title')}</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MenuTrigger
              id="header-menu-pages"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
              renderMenu={() =>
                menuItems.map((item, index) => (
                  <MenuItem key={index} onClick={handleMenuItemClick(item.to)}>
                    {item.title}
                  </MenuItem>
                ))
              }
            >
              {(handleMenuOpen) => (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(e) => handleMenuOpen(e.currentTarget)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </MenuTrigger>
          </Box>
          <Box columnGap={2} flex={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item, index) => (
              <NavLink key={index} to={item.to} className={({ isActive }) => (isActive ? controlClassName.Active : '')}>
                {item.title}
              </NavLink>
            ))}
          </Box>
          <Box columnGap={2} flexGrow={0} display="flex">
            {UserLanguage.options.map((lang, index) => (
              <Link
                key={index}
                onClick={handleLanguageClick(lang)}
                href="#"
                className={lang === i18n.language ? controlClassName.Active : ''}
              >
                {languageTranslation(lang)}
              </Link>
            ))}
          </Box>
          <Box flexGrow={0} columnGap={2}>
            <Button onClick={handleSwitchThemeClick} color="inherit">
              {currentTheme.type === 'light' ? <DarkMode /> : <LightMode />}
            </Button>
          </Box>
          {hasValue(displayName) && (
            <Box display="flex" flexGrow={0} columnGap={2}>
              <Typography>{displayName}</Typography>
              <Button color="inherit" onClick={handleLogoutClick}>
                {t('global.buttons.logout')}
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </HeaderStyled>
  )
}
