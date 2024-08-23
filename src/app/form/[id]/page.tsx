'use client'

import { useForm } from '@/providers/form-provider'
import { useEffect } from 'react'

import { FormHeader } from '@/components/form/formHeader'
import { FormQuestion } from '@/components/form/formQuestion'

interface PageProps {
  params: { id: string }
}

export default function Page({ params: { id } }: PageProps) {
  const { form, setID } = useForm()

  useEffect(() => {
    setID(id)
  }, [id, setID])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/form/api?id=${id}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      alert(errorData.error)
      return null
    }
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/form/done`
  }

  return (
    <>
      <FormHeader form={form} />
      <form
        onSubmit={handleSubmit}
        className='flex size-full flex-col gap-14 rounded-box border-2 p-10'
      >
        {form.columns.map((column) => (
          <div
            key={column.order}
            className='flex w-full flex-col items-start gap-2.5'
          >
            <FormQuestion column={column} />
          </div>
        ))}
        <hr />
        <button
          type='submit'
          className='w-full rounded-xl bg-primary p-2 text-white'
        >
          Submit
        </button>
      </form>
    </>
  )
}
