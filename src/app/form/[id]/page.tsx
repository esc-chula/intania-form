'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import { Box } from '@/components'
import { Field } from '@/components/form/field'

import { useFormSchema } from '@/providers/form-schema-provider'

interface PageProps {
  params: { id: string }
}

export default function Page({ params: { id } }: PageProps) {
  const { formSchema, setID } = useFormSchema()
  const router = useRouter()

  useEffect(() => {
    setID(id)
  }, [id, setID])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const response = await fetch(`/form/api?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json()
      toast.error(errorData.error)
      return
    }

    router.push(`/form/${id}/done`)
  }

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.reset()
  }

  return (
    <div className='flex w-full flex-col items-center justify-center space-y-4 px-5 pb-6'>
      <Toaster position='top-center' reverseOrder={false} />
      <Box>
        <h1 className='text-header-1 font-bold text-neutral-900'>
          {formSchema.heading}
        </h1>
        <hr />
        <h2 className='text-subtitle text-neutral-500'>
          {formSchema.subheading}
        </h2>
      </Box>
      <Box>
        <form
          onSubmit={handleSubmit}
          onReset={handleReset}
          className='flex flex-col gap-14'
        >
          {formSchema.columns.map((column) => (
            <div
              key={column.id}
              className='flex w-full flex-col items-start gap-2.5'
            >
              <Field column={column} />
            </div>
          ))}
          <div className='flex w-full flex-col gap-5'>
            <hr />
            <div className='flex flex-row items-center justify-between'>
              <button type='reset' className='text-body-1 text-neutral-400'>
                ล้างฟอร์ม
              </button>
              <button
                type='submit'
                className='size-fit rounded-[10px] bg-carmine-500 px-8 py-[10px] text-body-1 text-white'
              >
                ส่งคำตอบ
              </button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  )
}
