import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { AuthenticationRequest } from '@api/endpoints/auth/types'
import { useAuthentication } from '@hooks/useAuthentication'
import { Box } from '@mui/material'
import { Page } from '@layout/Page'
import { Form, FormTextField, useForm } from '@controls/Form'
import { Button } from '@controls/Button'

const Login: React.FC = () => {
  const { t } = useTranslation()
  const { login } = useAuthentication()

  const form = useForm({
    resolver: AuthenticationRequest,
    onSubmit: login
  })

  return (
    <Page>
      <Form f={form}>
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

export default Login
