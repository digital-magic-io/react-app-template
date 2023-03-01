import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { AuthenticationRequest } from '@api/endpoints/auth/types'
import { useAuthentication } from '@hooks/useAuthentication'
import { Alert, Box } from '@mui/material'
import { Page } from '@layout/Page'
import { Form, FormTextField, useFormTyped } from '@controls/Form'
import { Button } from '@controls/Button'
import { hasValue } from '@digital-magic/ts-common-utils'
import { useEnumTranslation } from '@hooks/Translation/useEnumTranslation'

const LoginPage: React.FC = () => {
  const { t } = useTranslation()
  const { login, logoutReason } = useAuthentication()
  const { logoutReasonTranslation } = useEnumTranslation()

  const form = useFormTyped({
    resolver: AuthenticationRequest,
    onSubmit: login
  })

  return (
    <Page>
      {hasValue(logoutReason) && <Alert severity="error">{logoutReasonTranslation(logoutReason)}</Alert>}
      {/* TODO: Remove onInvalid - this is for debug purposes */}
      <Form f={form} onInvalid={(e) => console.log(e)}>
        <Box display="flex" flexDirection="column" rowGap={2}>
          <h1>{t('pages.login.title')}</h1>
          <FormTextField name={form.names.username} label={t('pages.login.form.fields.username')} />
          <FormTextField name={form.names.password} label={t('pages.login.form.fields.password')} />
          <Button type="submit">{t('pages.login.form.buttons.submit')}</Button>
        </Box>
      </Form>
    </Page>
  )
}

export default LoginPage
