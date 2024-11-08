'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import type { FormColumn } from '@/types'

interface CheckboxProps {
  column: FormColumn
}

export const Checkbox = ({ column }: CheckboxProps): JSX.Element => {
  const [isValid, setIsValid] = useState(true)

  return (
    <div className='flex w-full flex-col items-start justify-start'>
      <label className='relative flex w-full cursor-pointer select-none flex-row-reverse items-center justify-end'>
        <p className='ml-2 text-body-1 text-black'>{column.name}</p>
        <input
          type='checkbox'
          name={column.name}
          required={column.required}
          className='size-4 rounded-md'
          onInvalid={(e) => {
            e.preventDefault()
            setIsValid(false)
            toast.error('กรุณายอมรับข้อตกลง', { id: 'invalid' })
          }}
        />
        {!isValid ? (
          <p className='absolute -bottom-10 my-2 w-full text-body-2 italic text-red-600'>
            จำเป็นต้องยอมรับ
          </p>
        ) : null}
      </label>
    </div>
  )
}
