import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useNavigate } from 'react-router-dom'
import { routes } from '@constants/routes'
import { User, UserList, Username } from '@api/endpoints/users/types'
import { useGetUsers } from '@api/endpoints/users/requests'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { Page } from '@layout/Page'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Button } from '@controls/Button'
import { Handler } from '@digital-magic/ts-common-utils'
import { HtmlMouseButtonEventHandler } from '@digital-magic/react-common'

const UsersPage: React.FC = () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const defaultErrorHandler = useDefaultPublicErrorHandler()
  const getUsers = useGetUsers({ onError: defaultErrorHandler })

  const isLoading = getUsers.isLoading

  const onEditClick: Handler<Username> = (username) => {
    navigate(generatePath(routes.UserEdit, { username: username } /*, { replace: true }*/))
  }

  const columns: Array<GridColDef<User>> = React.useMemo(
    () => [
      { field: 'username', headerName: t('pages.users.fields.username'), minWidth: 200 },
      { field: 'password', headerName: t('pages.users.fields.password'), minWidth: 200 },
      { field: 'displayName', headerName: t('pages.users.fields.displayName'), minWidth: 200 },
      { field: 'role', headerName: t('pages.users.fields.role'), minWidth: 200 },
      {
        field: 'actions',
        renderCell: (params) => (
          <Button onClick={() => onEditClick(params.row.username)}>{t('global.buttons.edit')}</Button>
        )
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n]
  )

  const rows: UserList = React.useMemo(
    () =>
      getUsers.data
        ?.concat()
        ?.map((v) => ({ id: v.username, ...v }))
        ?.sort((a, b) => a.displayName.localeCompare(b.displayName)) ?? [],
    [getUsers.data]
  )

  const onRefreshClick: HtmlMouseButtonEventHandler = (e) => {
    e.preventDefault()
    void getUsers.refetch()
  }

  return (
    <Page>
      <Typography variant="h1">{t('pages.users.title')}</Typography>
      <Box my={3}>
        <Button to={routes.UserNew} disabled={isLoading}>
          {t('global.buttons.new')}
        </Button>
        <Button onClick={onRefreshClick} disabled={isLoading}>
          {t('global.buttons.refresh')}
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid columns={columns} rows={rows} checkboxSelection disableSelectionOnClick />
      </Box>
    </Page>
  )
}

export default UsersPage
