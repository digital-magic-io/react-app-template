import { FieldValues, FormProvider } from 'react-hook-form'
import { FormProps } from '@digital-magic/react-common/lib/components/controls/form'

// TODO: Why it doesn't work if imported from another project?
//export { Form } from '@digital-magic/react-common/lib/components/controls/form'

export const Form = <T extends FieldValues>({ children, f, onInvalid, ...props }: FormProps<T>): JSX.Element => {
  return (
    <FormProvider {...f}>
      <form {...props} onSubmit={f.handleSubmit(f.onSubmit, onInvalid)}>
        {children}
      </form>
    </FormProvider>
  )
}
