import { Form } from '@/types/form'

import { FormContainer } from './form-container'

export function FormHeader({ form }: { form: Form }) {
  return (
    <FormContainer>
      <h1 className='text-header text-neutral-900'>{form.heading}</h1>
      <hr />
      <h2 className='text-subtitle text-neutral-500'>{form.subheading}</h2>
    </FormContainer>
  )
}
