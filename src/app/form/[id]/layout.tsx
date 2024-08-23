import FormProvider from '@/providers/form-provider'

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  params: { id: string }
}>) {
  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 py-8'>
      <FormProvider>{children}</FormProvider>
    </div>
  )
}
