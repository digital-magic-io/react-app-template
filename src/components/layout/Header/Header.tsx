import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom'
import { TFunction } from 'i18next'
import { Box, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { DarkMode, LightMode, Menu as MenuIcon } from '@mui/icons-material'
import { hasValue, NullableType } from '@digital-magic/ts-common-utils'
import { controlClassName, HtmlMouseButtonEventHandler, HtmlMouseEventHandler } from '@digital-magic/react-common'
import { routes } from '@constants/routes'
import { useAppContext } from '@context/AppContext'
import { HeaderStyled } from './style'
import { UserLanguage } from '@model/common'
import { useAuthStore } from '@hooks/useAuthStore'
import { Link } from '@controls/Link'
import { Button } from '@controls/Button'
import { useAuthentication } from '@hooks/useAuthentication'

type MenuItemProps = {
  title: ReturnType<TFunction>
  to: NavLinkProps['to']
}

export const languageTranslation =
  (t: TFunction) =>
  (lang: UserLanguage): string => {
    switch (lang) {
      case 'et':
        return t('enums.language.et')
      case 'ru':
        return t('enums.language.ru')
      case 'en':
        return t('enums.language.en')
    }
  }

export const Header: React.FC = () => {
  const { i18n, t } = useTranslation()
  const [anchorMenu, setAnchorMenu] = React.useState<NullableType<HTMLElement>>(null)
  const { currentTheme, switchTheme } = useAppContext()
  const displayName = useAuthStore((state) => state.auth?.displayName)
  const { logout } = useAuthentication()
  const navigate = useNavigate()

  const handleCloseNavMenu: React.DispatchWithoutAction = () => {
    setAnchorMenu(null)
  }

  const handleOpenNavMenu: React.Dispatch<React.MouseEvent<HTMLElement>> = (e) => {
    setAnchorMenu(e.currentTarget)
  }

  const handleSwitchThemeClick: HtmlMouseButtonEventHandler = (e) => {
    e.preventDefault()
    switchTheme(currentTheme.type === 'light' ? 'dark' : 'light')
  }

  const handleMenuItemClick: (to: NavLinkProps['to']) => HtmlMouseEventHandler = (to) => (e) => {
    e.preventDefault()
    handleCloseNavMenu()
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
      }
    ],

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.language]
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const translateLang = React.useMemo(() => languageTranslation(t), [i18n.language])

  return (
    <HeaderStyled position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <Link to={routes.Index}>{t('app.title')}</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="header-menu-pages"
              anchorEl={anchorMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorMenu)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {menuItems.map((item, index) => (
                <MenuItem key={index} onClick={handleMenuItemClick(item.to)}>
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box columnGap={2} flex={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item, index) => (
              <NavLink key={index} to={item.to} className={({ isActive }) => (isActive ? controlClassName.Active : '')}>
                {item.title}
              </NavLink>
            ))}
          </Box>
          <Box columnGap={2} flex={1} display="flex">
            {UserLanguage.options.map((lang, index) => (
              <Link
                key={index}
                onClick={handleLanguageClick(lang)}
                href="#"
                className={lang === i18n.language ? controlClassName.Active : ''}
              >
                {translateLang(lang)}
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }} columnGap={2}>
            <Button onClick={handleSwitchThemeClick} color="inherit">
              {currentTheme.type === 'light' ? <DarkMode /> : <LightMode />}
            </Button>
          </Box>
          {hasValue(displayName) && (
            <Box sx={{ flexGrow: 0 }} display="flex" columnGap={2}>
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
