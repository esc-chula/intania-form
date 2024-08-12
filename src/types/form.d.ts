import type { UIDataTypeKeys } from './ui-data'

export interface FormColumn {
  columnName: string
  label: string
  description: string
  uidt: UIDataTypeKeys
  order: number
  required: boolean
  colOptions?: string[]
}

export interface Form {
  heading: string
  subheading: string
  columns: FormColumn[]
}
