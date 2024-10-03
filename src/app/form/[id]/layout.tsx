import FormProvider from '@/providers/form-provider'

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FormProvider>{children}</FormProvider>
}
