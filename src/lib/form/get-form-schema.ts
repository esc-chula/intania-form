import type { Form } from '@/types/form'

import { getColumnDetail } from './get-column-detail'
import { getFormIds } from './get-form-ids'

export const getFormSchema = async (customId: string): Promise<Form> => {
  const tableIdResponse = await getFormIds(customId)
  if (tableIdResponse == null) {
    throw new Error('No form in this name')
  }
  const viewID = tableIdResponse.FormViewID

  const response = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/meta/forms/${viewID}`,
    {
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
      },
      next: { revalidate: 60 },
    }
  )

  const data = await response.json()
  data.columns = data.columns.filter((column: { show: number }) => column.show)

  data.columns = await Promise.all(
    data.columns.map(
      async (column: {
        label: string | null
        required: boolean
        fk_column_id: string
      }) => {
        const columnData = await getColumnDetail(column.fk_column_id)

        return {
          ...column,
          ...columnData,
          label: column.label ?? columnData.label,
          required: column.required,
        }
      }
    )
  )

  const form: Form = {
    heading: data.heading,
    subheading: data.subheading,
    columns: data.columns,
  }

  return form
}
