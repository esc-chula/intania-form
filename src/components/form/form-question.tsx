import { FormColumn } from '@/types/form'

import { getFormComponent } from '@/components/form/form-component'

export function FormQuestion({ column }: { column: FormColumn }) {
  return (
    <div className='flex w-full flex-col items-start justify-start gap-2.5'>
      <div className='flex flex-col'>
        <h3 className='flex text-subtitle font-bold text-neutral-900'>
          {column.label}
          {column.required ? <p className='text-red-500'>*</p> : null}
        </h3>
        <p className='text-body-1 font-light text-gray-600'>
          {column.description}
        </p>
      </div>
      {getFormComponent(column)}
    </div>
  )
}
