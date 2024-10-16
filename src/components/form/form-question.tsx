import { FormColumn } from '@/types/form'
import { UIDataType } from '@/types/ui-data'

import { Input } from '@/components/input'

export function FormQuestion({ column }: { column: FormColumn }) {
  return (
    <div className='flex w-full flex-col items-start justify-start gap-2.5'>
      <div className='flex flex-col'>
        <h3 className='text-title2 font-bold text-neutral-900'>
          {column.label}
          {column.required ? <span className='text-red-500'> *</span> : null}
        </h3>
        <p className='text-subtitle font-light text-gray-600'>
          {column.description}
        </p>
      </div>
      {UIDataType[column.uidt] === UIDataType.SingleLineText ? (
        <Input
          type='text'
          name={column.columnName}
          required={column.required}
          placeholder={'คำตอบ'}
        />
      ) : null}
      {UIDataType[column.uidt] === UIDataType.PhoneNumber ? (
        <Input
          type='tel'
          name={column.columnName}
          required={column.required}
          placeholder='คำตอบ'
        />
      ) : null}
      {UIDataType[column.uidt] === UIDataType.Number ? (
        <Input
          type='number'
          name={column.columnName}
          required={column.required}
          placeholder='คำตอบ'
        />
      ) : null}
      {UIDataType[column.uidt] === UIDataType.Checkbox ? (
        <div className='flex w-full flex-col items-start justify-start'>
          <label className='relative flex w-full cursor-pointer select-none flex-row-reverse items-center justify-end'>
            <p className='ml-2 text-black'>ยอมรับ</p>
            <input
              type='checkbox'
              name={column.columnName}
              required={column.required}
              onInvalid={(e) => {
                e.preventDefault()
                ;(
                  e.target as HTMLInputElement
                ).nextElementSibling?.classList.remove('hidden')
              }}
              onInput={(e) => {
                ;(
                  e.target as HTMLInputElement
                ).nextElementSibling?.classList.add('hidden')
              }}
            />
            <p className='absolute -bottom-8 my-2 hidden w-full text-sm italic text-red-600'>
              จำเป็นต้องยอมรับ
            </p>
          </label>
        </div>
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
      {UIDataType[column.uidt] === UIDataType.LongText ? (
        <div className='flex w-full flex-col'>
          <textarea
            name={column.columnName}
            required={column.required}
            className='flex h-20 w-full resize-none overflow-y-scroll rounded-md border border-neutral-200 px-2 py-1'
            onInvalid={(e) => {
              e.preventDefault()
              ;(
                e.target as HTMLInputElement
              ).nextElementSibling?.classList.remove('hidden')
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
