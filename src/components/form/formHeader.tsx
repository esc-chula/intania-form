import { Form } from '@/types/form'

export function FormHeader({ form }: { form: Form }) {
  return (
    <div className='flex w-full flex-col gap-5 rounded-box border-2 p-10'>
      <h1 className='text-4xl font-bold text-neutral-900'>{form.heading}</h1>
      <hr />
      <h2 className='text-lg text-neutral-500'>{form.subheading}</h2>
    </div>
  )
}
