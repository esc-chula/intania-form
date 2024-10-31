import { FormColumn } from '@/types/form'
import { UIDataType } from '@/types/ui-data'
import React from 'react'
import { toast } from 'react-hot-toast'

import { Input } from '@/components/input'

export const getFormComponent = (column: FormColumn): React.ReactNode => {
  if (!Object.values(UIDataType).includes(column.uidt)) {
    return (
      <p className='text-body-2 font-light italic text-red-600'>
        This system does not support {column.uidt}.
      </p>
    )
  }
  switch (column.uidt) {
    case 'SingleLineText':
      return (
        <Input
          type='text'
          name={column.columnName}
          required={column.required}
        />
      )
    case 'PhoneNumber':
      return (
        <Input
          type='tel'
          id={column.columnName}
          name={column.columnName}
          required={column.required}
        />
      )
    case 'Number':
      return (
        <Input
          type='number'
          name={column.columnName}
          required={column.required}
        />
      )
    case 'Checkbox':
      return (
        <div className='flex w-full flex-col items-start justify-start'>
          <label className='relative flex w-full cursor-pointer select-none flex-row-reverse items-center justify-end'>
            <p className='ml-2 text-body-1 text-black'>ยอมรับ</p>
            <input
              type='checkbox'
              name={column.columnName}
              required={column.required}
              className='size-4 rounded-md'
              onInvalid={(e) => {
                e.preventDefault()
                ;(
                  e.target as HTMLInputElement
                ).nextElementSibling?.classList.remove('hidden')
                toast.error('กรุณากรอกคำตอบให้ครบ', { id: 'invalid' })
              }}
              onInput={(e) => {
                ;(
                  e.target as HTMLInputElement
                ).nextElementSibling?.classList.add('hidden')
              }}
            />
            <p className='absolute -bottom-10 my-2 hidden w-full text-body-2 italic text-red-600'>
              จำเป็นต้องยอมรับ
            </p>
          </label>
        </div>
      )
    case 'SingleSelect':
      return (
        <div className='relative flex w-full'>
          <select
            name={column.columnName}
            required={column.required}
            className='flex h-10 w-full rounded-md border border-neutral-200 px-2 py-1 text-body-1'
            defaultValue=''
            onInvalid={(e) => {
              e.preventDefault()
              ;(
                e.target as HTMLInputElement
              ).nextElementSibling?.classList.remove('hidden')
              toast.error('กรุณากรอกคำตอบให้ครบ', { id: 'invalid' })
            }}
            onInput={(e) => {
              ;(e.target as HTMLInputElement).nextElementSibling?.classList.add(
                'hidden'
              )
            }}
          >
            <option disabled value=''>
              -- select an option --
            </option>
            {column.colOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className='absolute -bottom-10 my-2 hidden w-full text-body-2 italic text-red-600'>
            จำเป็นต้องเลือก
          </p>
        </div>
      )
    case 'LongText':
      return (
        <div className='flex w-full flex-col'>
          <textarea
            name={column.columnName}
            required={column.required}
            className='flex h-20 w-full resize-none overflow-y-scroll rounded-md border border-neutral-200 px-2 py-1 text-body-1'
            onInvalid={(e) => {
              e.preventDefault()
              ;(
                e.target as HTMLInputElement
              ).nextElementSibling?.classList.remove('hidden')
              toast.error('กรุณากรอกคำตอบให้ครบ', { id: 'invalid' })
            }}
            onInput={(e) => {
              ;(e.target as HTMLInputElement).nextElementSibling?.classList.add(
                'hidden'
              )
            }}
          />
          <p className='my-2 hidden w-full text-sm italic text-red-600'>
            จำเป็นต้องตอบคำถามนี้
          </p>
        </div>
      )
    default:
      return (
        <p className='text-body-2 font-light italic text-red-600'>
          This system currently does not support {column.uidt}.
        </p>
      )
  }
}
