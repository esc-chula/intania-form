'use client'

import { useForm } from '@/providers/form-provider'
import { UIDataType } from '@/types/ui-data'
import { useEffect } from 'react'

interface PageProps {
  params: { id: string }
}

export default function Page({ params: { id } }: PageProps) {
  const { form, setID } = useForm()

  useEffect(() => {
    setID(id)
  }, [id, setID])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/form/api?id=${id}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex size-full flex-col gap-14 rounded-box border-2 p-10'
    >
      {form.columns.map((column) => (
        <div
          key={column.order}
          className='flex w-full flex-col items-start gap-2.5'
        >
          <div className='flex flex-col'>
            <h3 className='text-lg'>{column.label}</h3>
            <p className='text-gray-400'>{column.description}</p>
          </div>
          {UIDataType[column.uidt] === UIDataType.SingleLineText ? (
            <input
              type='text'
              name={column.columnName}
              required={column.required}
              className='flex w-full rounded-md border border-neutral-200 px-2 py-1'
            />
          ) : null}
          {UIDataType[column.uidt] === UIDataType.PhoneNumber ? (
            <input
              type='tel'
              name={column.columnName}
              required={column.required}
              className='flex w-full rounded-md border border-neutral-200 px-2 py-1'
            />
          ) : null}
          {UIDataType[column.uidt] === UIDataType.Checkbox ? (
            <input
              type='checkbox'
              name={column.columnName}
              required={column.required}
            />
          ) : null}
          {UIDataType[column.uidt] === UIDataType.SingleSelect ? (
            <select
              name={column.columnName}
              required={column.required}
              className='flex w-full rounded-md border border-neutral-200 px-2 py-1'
            >
              {column.colOptions?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : null}
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
  )
}
