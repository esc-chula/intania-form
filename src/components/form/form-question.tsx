import { FormColumn } from '@/types/form'
import { UIDataType } from '@/types/ui-data'
import toast from 'react-hot-toast'

import { Input } from '@/components/input'

export function FormQuestion({ column }: { column: FormColumn }) {
  return (
    <div className='flex w-full flex-col items-start justify-start gap-2.5'>
      <div className='flex flex-col'>
        <h3 className='flex gap-1 text-subtitle font-semibold text-neutral-900'>
          {column.label}
          {column.required ? <p className='text-red-500'>*</p> : null}
        </h3>
        <p className='text-body-1 font-normal text-gray-600'>
          {column.description}
        </p>
      </div>
      {UIDataType[column.uidt] === UIDataType.SingleLineText ? (
        <Input
          type='text'
          name={column.columnName}
          required={column.required}
        />
      ) : null}
      {UIDataType[column.uidt] === UIDataType.PhoneNumber ? (
        <Input
          type='tel'
          id={column.columnName}
          name={column.columnName}
          required={column.required}
        />
      ) : null}
      {UIDataType[column.uidt] === UIDataType.Number ? (
        <Input
          type='number'
          name={column.columnName}
          required={column.required}
        />
      ) : null}
      {UIDataType[column.uidt] === UIDataType.Checkbox ? (
        <div className='flex w-full flex-col items-start justify-start'>
          <div className='relative flex w-full cursor-pointer select-none flex-row-reverse items-center justify-end'>
            <p className='ml-2 text-body-1 text-black'>ยอมรับ</p>
            <input
              type='checkbox'
              name={column.columnName}
              required={column.required}
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
              className='size-4 rounded-md border-neutral-200'
            />
            <p className='absolute -bottom-8 my-2 hidden w-full text-body-2 italic text-red-600'>
              จำเป็นต้องยอมรับ
            </p>
          </div>
        </div>
      ) : null}
      {UIDataType[column.uidt] === UIDataType.SingleSelect ? (
        <div className='relative flex w-full'>
          <select
            name={column.columnName}
            required={column.required}
            className='flex h-10 w-full rounded-md border border-neutral-200 px-2 py-1'
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
          <p className='absolute -bottom-8 my-2 hidden w-full text-sm italic text-red-600'>
            จำเป็นต้องเลือก
          </p>
        </div>
      ) : null}
      {UIDataType[column.uidt] === UIDataType.LongText ? (
        <div className='flex w-full flex-col'>
          <textarea
            name={column.columnName}
            required={column.required}
            className='body flex h-20 w-full resize-none overflow-y-scroll rounded-md border border-neutral-200 px-2 py-1'
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
      ) : null}
    </div>
  )
}
