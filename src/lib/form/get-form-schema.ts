import { Form, FormColumn } from '@/types/form'

import { getColumnDetail, getNocoID } from '@/lib/fetcher'

export const getFormSchema = async (id: string): Promise<Form | Response> => {
  const tableIdResponse = await getNocoID(id)
  if (tableIdResponse == null) {
    return Response.json({ error: 'No form in this name' }, { status: 400 })
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
      async (column: { label: string | null; fk_column_id: string }) => {
        const columnData = await getColumnDetail(column.fk_column_id)

        return {
          ...column,
          ...columnData,
          label: column.label ?? columnData.label,
        }
      }
    )
  )

  const form: Form = {
    heading: data.heading,
    subheading: data.subheading,
    columns: data.columns.map((column: FormColumn) => ({
      label: column.label,
      description: column.description,
      uidt: column.uidt,
      order: column.order,
      required: column.required,
      colOptions: column.colOptions,
      columnName: column.columnName,
    })),
  }

  return form
}
