'use client'

import { env } from 'next-runtime-env'
import { createContext, useContext, useEffect, useState } from 'react'

import type { Form } from '@/types/form'

interface FormSchemaContextType {
  formSchema: Form
  setID: (id: string) => void
}

export const FormSchemaContext = createContext<FormSchemaContextType>({
  formSchema: {
    heading: '',
    subheading: '',
    columns: [],
  },
  setID: () => {},
})

export function FormSchemaProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [formSchema, setFormSchema] = useState<Form>({
    heading: '',
    subheading: '',
    columns: [],
  })
  const [id, setID] = useState('')
  useEffect(() => {
    if (!id) return
    const getFormSchema = async (id: string) => {
      const response = await fetch(
        `${env('NEXT_PUBLIC_BASE_URL')}/form/api?id=${id}`,
        {
          next: { revalidate: 60 },
        }
      )

      const data = await response.json()
      setFormSchema(data)
    }

    void getFormSchema(id)
  }, [id, setFormSchema])

  return (
    <FormSchemaContext.Provider
      value={{
        formSchema: formSchema,
        setID: (newId: string) => {
          if (newId !== id) setID(newId)
        },
      }}
    >
      {children}
    </FormSchemaContext.Provider>
  )
}

export const useFormSchema = () => {
  const { formSchema, setID } = useContext(FormSchemaContext)
  return { formSchema, setID }
}
