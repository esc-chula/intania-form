'use client'

import type { Form } from '@/types/form'
import { createContext, useContext, useEffect, useState } from 'react'

interface FormContextType {
  form: Form
  setID: (id: string) => void
}

export const FormContext = createContext<FormContextType>({
  form: {
    heading: '',
    subheading: '',
    columns: [],
  },
  setID: () => {},
})

export default function FormProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [form, setForm] = useState<Form>({
    heading: '',
    subheading: '',
    columns: [],
  })
  const [id, setID] = useState('')
  useEffect(() => {
    if (!id) return
    const getForm = async (id: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/form/api?id=${id}`,
        {
          next: { revalidate: 60 },
        }
      )

      const data = await response.json()
      setForm(data)
    }

    void getForm(id)
  }, [id, setForm])

  return (
    <FormContext.Provider
      value={{
        form,
        setID: (newId: string) => {
          if (newId !== id) setID(newId)
        },
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useForm = () => {
  const { form, setID } = useContext(FormContext)
  return { form, setID }
}
