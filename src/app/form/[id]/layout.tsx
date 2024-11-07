import { getFormSchema } from '@/lib/form/get-form-schema'

import { FormSchemaProvider } from '@/providers/form-schema-provider'

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}) {
  const form = await getFormSchema(id)

  return {
    title: form.heading,
  }
}

export default async function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <FormSchemaProvider>{children}</FormSchemaProvider>
}
