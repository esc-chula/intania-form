import {
  Checkbox,
  FileAttachment,
  Input,
  SingleSelect,
  Textarea,
} from '@/components'

import type { FormColumn } from '@/types'

export const FormComponent = (column: FormColumn): React.ReactNode => {
  switch (column.uidt) {
    case 'SingleLineText':
      return <Input type='text' name={column.name} required={column.required} />
    case 'PhoneNumber':
      return (
        <Input
          type='tel'
          id={column.name}
          name={column.name}
          required={column.required}
        />
      )
    case 'Number':
      return (
        <Input type='number' name={column.name} required={column.required} />
      )
    case 'Checkbox':
      return <Checkbox column={column} />
    case 'SingleSelect':
      return <SingleSelect column={column} />
    case 'LongText':
      return <Textarea column={column} />
    case 'Attachment':
      return (
        <FileAttachment
          id={column.name}
          name={column.name}
          required={column.required}
          onFileSelect={() => {}}
        />
      )
    default:
      return (
        <p className='text-body-2 font-light italic text-red-600'>
          This system currently does not support {column.uidt}.
        </p>
      )
  }
}
