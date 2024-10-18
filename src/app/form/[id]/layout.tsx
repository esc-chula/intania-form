import FormProvider from '@/providers/form-provider'

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FormProvider>{children}</FormProvider>
  return (
    <div className='flex size-full flex-col items-center justify-start gap-8 px-5 py-8'>
      <FormProvider>{children}</FormProvider>
    </div>
  )
}
