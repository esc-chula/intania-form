'use client'

import { useForm } from '@/providers/form-provider'
import { useEffect } from 'react'

import { FormContainer } from '@/components/form/form-container'
import { FormHeader } from '@/components/form/form-header'
import { FormQuestion } from '@/components/form/form-question'

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

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset()
  }

  return (
    <div className='flex size-full flex-col items-center justify-start gap-8 px-5 py-8'>
      <FormHeader form={form} />
      <FormContainer>
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className='flex flex-col gap-14'
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
          <div className='flex flex-row items-center justify-between'>
            <button type='reset' className='text-body text-neutral-400'>
              ล้างฟอร์ม
            </button>
            <button
              type='submit'
              className='size-fit rounded-[10px] bg-carmine-500 px-8 py-[10px] text-white'
            >
              ส่งคำตอบ
            </button>
          </div>
        </form>
      </FormContainer>
    </div>
  )
}
