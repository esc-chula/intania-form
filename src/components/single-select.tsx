import toast from 'react-hot-toast'

import type { FormColumn } from '@/types'

interface SingleSelectProps {
  column: FormColumn
}

export const SingleSelect = ({ column }: SingleSelectProps): JSX.Element => {
  return (
    <div className='relative flex w-full'>
      <select
        name={column.name}
        required={column.required}
        className='flex h-10 w-full rounded-md border border-neutral-200 px-2 py-1 text-body-1'
        defaultValue=''
        onInvalid={(e) => {
          e.preventDefault()

          toast.error('กรุณากรอกคำตอบให้ครบ', { id: 'invalid' })
        }}
      >
        <option disabled value=''>
          -- select an option --
        </option>
        {column.options?.map((option) => (
          <option key={option.id} value={option.title}>
            {option.title}
          </option>
        ))}
      </select>
      <p className='absolute -bottom-10 my-2 hidden w-full text-body-2 italic text-red-600'>
        จำเป็นต้องเลือก
      </p>
    </div>
  )
}
