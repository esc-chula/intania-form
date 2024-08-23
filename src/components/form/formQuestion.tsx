import { FormColumn } from '@/types/form'
import { UIDataType } from '@/types/ui-data'

export function FormQuestion({ column }: { column: FormColumn }) {
  return (
    <>
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
    </>
  )
}
