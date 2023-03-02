import * as React from 'react'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Password } from '@model/common'
import { useCreateUser } from '@api/endpoints/users/requests'
import { useDefaultPublicErrorHandler } from '@hooks/useDefaultPublicErrorHandler'
import { Form, FormTextField, useFormTyped } from '@controls/Form'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import { Page } from '@layout/Page'
import { Handler } from '@digital-magic/ts-common-utils'
import { routes } from '@constants/routes'
import { User, UserCreatedResponse } from '@api/endpoints/users/types'
import { RequestErrorHandler } from '@api/types'
import { isHttpError } from '@digital-magic/react-common/lib/api'
import { useSnackbarContext } from '@context/SnackbarContext'

const SignUpForm = User.omit({role:true}).extend({confirmPassword: Password}).refine(data => data.password === data.confirmPassword, {
	path:['confirmPassword'],
})
type SignUpForm = z.infer<typeof SignUpForm>

const SignUpPage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const defaultErrorHandler = useDefaultPublicErrorHandler()

	const snackbar = useSnackbarContext()

  const onCreateUserSuccess: Handler<UserCreatedResponse> = () => {
    navigate(routes.Login)
  }

	const onCreateUserError: RequestErrorHandler = (e) => {
    if (isHttpError(e) && e.httpStatus === 409) {
			return snackbar.open({ message: t('pages.signUp.form.errors.userExists') })
    } else {
      return defaultErrorHandler(e)
    }
  }

  const createUser = useCreateUser({ onError: onCreateUserError, onSuccess: onCreateUserSuccess })

  const isLoading: boolean = createUser.isLoading 

  const form = useFormTyped({
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
              label={t('pages.signUp.form.fields.username')}
              disabled={isLoading}
            />
						<FormTextField
              name={form.names.displayName}
              label={t('pages.signUp.form.fields.displayName')}
              disabled={isLoading}
            />
            <FormTextField
              type="password"
              name={form.names.password}
              label={t('pages.signUp.form.fields.password')}
              disabled={isLoading}
            />
						<FormTextField
              type="password"
              name={form.names.confirmPassword}
              label={t('pages.signUp.form.fields.confirmPassword')}
              disabled={isLoading}
            />
						<Button type="submit">{t('pages.signUp.form.buttons.submit')}</Button>
						</Box>
					)}
      </Form>
    </Page>
  )
}

export default SignUpPage
