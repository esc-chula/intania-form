import type { UIDataTypeKeys } from '.'

export interface FormColumn {
  id: string
  name: string
  label: string
  description: string
  uidt: UIDataTypeKeys
  required: boolean
  options?: { id: string; title: string }[]
}
