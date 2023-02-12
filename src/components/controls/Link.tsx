import * as React from 'react'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import { hasValue } from '@digital-magic/ts-common-utils'

// There is any combination for props 'to', 'href', 'onClick' is possible (even no any is set), no need to restrict.
export type LinkProps = MuiLinkProps & {
  to?: RouterLinkProps['to']
}

export const Link: React.FC<LinkProps> = ({ to, ...props }) =>
  hasValue(to) ? <MuiLink component={RouterLink} to={to} {...props} /> : <MuiLink {...props} />
