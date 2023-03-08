import * as React from 'react'
import { NullableType } from '@digital-magic/ts-common-utils'
import { Menu } from '@mui/material'
import { MenuProps } from '@mui/material/Menu/Menu'

type MenuOpenHandler = React.Dispatch<HTMLElement>

type ChildrenType = (handler: MenuOpenHandler) => React.ReactNode

type Props = //React.PropsWithChildren<ChildrenType> &
  Omit<MenuProps, 'open' | 'onClose' | 'anchorEl' | 'children'> & {
    children: ChildrenType
    renderMenu: () => React.ReactNode
  }

export const MenuTrigger: React.FC<Props> = ({ children, renderMenu, ...menuProps }) => {
  const [anchorMenu, setAnchorMenu] = React.useState<NullableType<HTMLElement>>(null)

  const handleMenuClose: React.DispatchWithoutAction = () => {
    setAnchorMenu(null)
  }

  const handleMenuOpen: MenuOpenHandler = (el) => {
    setAnchorMenu(el)
  }

  return (
    <>
      {children(handleMenuOpen)}
      <Menu
        anchorEl={anchorMenu}
        open={Boolean(anchorMenu)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        //TransitionComponent={Fade}
        //disableScrollLock
        {...menuProps}
      >
        {renderMenu()}
      </Menu>
    </>
  )
}
