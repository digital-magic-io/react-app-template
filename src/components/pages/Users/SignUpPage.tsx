import * as React from 'react'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Password } from '@model/common'
import { useCreateUser } from '@api/endpoints/users/requests'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { Form, FormTextField, useForm } from '@controls/Form'
import { Box, CircularProgress, Typography } from '@mui/material'
import { Page } from '@layout/Page'
import { Handler } from '@digital-magic/ts-common-utils'
import { routes } from '@constants/routes'
import { User, UserCreatedResponse } from '@api/endpoints/users/types'

const SignUpForm = User.omit({role:true}).extend({confirmPassword: Password}).refine(data => data.password === data.confirmPassword, {
	path:['confirmPassword'],
})
type SignUpForm = z.infer<typeof SignUpForm>

const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const defaultErrorHandler = useDefaultPublicErrorHandler()

  const onCreateUserSuccess: Handler<UserCreatedResponse> = () => {
    navigate(routes.Login)
  }


  const createUser = useCreateUser({ onError: defaultErrorHandler, onSuccess: onCreateUserSuccess })

  const isLoading: boolean = createUser.isLoading 

  const form = useForm({
    resolver: SignUpForm,
    onSubmit: (data) => createUser.mutate({role:'User', displayName: data.displayName, password: data.password, username: data.username})
  })


  return (
    <Page>
      <Typography variant="h3">{t('pages.signUp.title')}</Typography>
      <Form f={form} onInvalid={(e) => console.log(e)}>
        {isLoading ? (
          <CircularProgress />
					) : (
          <Box display="flex" flexDirection="column" rowGap={2} mb={4}>
            <FormTextField
              name={form.names.username}
              label={t('pages.user.form.fields.username')}
              disabled={isLoading}
            />
            <FormTextField
              type="password"
              name={form.names.password}
              label={t('pages.user.form.fields.password')}
              disabled={isLoading}
            />
						</Box>
					)}
      </Form>
    </Page>
  )
}

export default SignUpPage
