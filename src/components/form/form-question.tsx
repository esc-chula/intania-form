import { FormColumn } from '@/types/form'
import { UIDataType } from '@/types/ui-data'
import { Input } from '@components/input'

export function FormQuestion({ column }: { column: FormColumn }) {
  return (
    <>
      <div className='flex flex-col'>
        <h3 className='text-title2 font-bold text-neutral-900'>
          {column.label}
        </h3>
        <p className='text-subtitle font-normal text-gray-600'>
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
        <label className='flex cursor-pointer select-none flex-row items-center justify-center space-x-3'>
          <input
            type='checkbox'
            name={column.columnName}
            required={column.required}
          />
          <p className='text-black'>ยอมรับ</p>
        </label>
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
    </>
  )
}
