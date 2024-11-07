'use client'

import toast from 'react-hot-toast'

import type { FormColumn } from '@/types'

interface TextareaProps {
  column: FormColumn
}

export const Textarea = ({ column }: TextareaProps) => {
  return (
    <div className='flex w-full flex-col'>
      <textarea
        name={column.name}
        required={column.required}
        className='flex h-20 w-full resize-none overflow-y-scroll rounded-md border border-neutral-200 px-2 py-1 text-body-1'
        onInvalid={(e) => {
          e.preventDefault()
          toast.error('กรุณากรอกคำตอบให้ครบ', { id: 'invalid' })
        }}
      />
      <p className='my-2 hidden w-full text-sm italic text-red-600'>
        จำเป็นต้องตอบคำถามนี้
      </p>
    </div>
  )
}
