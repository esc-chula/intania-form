import FormProvider from '@/providers/form-provider'
import { Form } from '@/types/form'
import { Metadata } from 'next'

const getForm = async (id: string): Promise<Form> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/form/api?id=${id}`,
    {
      next: { revalidate: 60 },
    }
  )

  return response.json()
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const form = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/form/api?id=${id}`
  ).then((res) => res.json())

  return {
    title: form.heading,
  }
}

export default async function FormLayout({
  children,
  params: { id },
}: Readonly<{
  children: React.ReactNode
  params: { id: string }
}>) {
  const form = await getForm(id)

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 py-8'>
      <div className='flex w-full flex-col gap-5 rounded-box border-2 p-10'>
        <h1 className='text-4xl font-bold text-neutral-900'>{form.heading}</h1>
        <hr />
        <h2 className='text-lg text-neutral-500'>{form.subheading}</h2>
      </div>
      <FormProvider>{children}</FormProvider>
    </div>
  )
}
