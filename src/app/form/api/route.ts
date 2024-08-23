import { Form, FormColumn } from '@/types/form'

import { getColumnDetail, getNocoID } from '@/lib/fetcher'

const getFormSchema = async (id: string): Promise<Form | Response> => {
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return Response.json({ error: 'ID not provided' }, { status: 400 })
  }

  const form = await getFormSchema(id)
  return Response.json(form)
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return Response.json({ error: 'ID not provided' }, { status: 400 })
  }

  const body = await request.json()
  const tableIdResponse = await getNocoID(id)
  if (tableIdResponse == null) {
    return Response.json({ error: 'No form in this name' }, { status: 400 })
  }
  const tableID = tableIdResponse.TableID

  // return if any field is ""
  if (Object.values(body).some((value) => value === '')) {
    return Response.json({ error: 'Missing Field' }, { status: 400 })
  }

  const response = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/tables/${tableID}/records`,
    {
      method: 'POST',
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )

  if (!response.ok) {
    const errorMsg = await response.json()
    return Response.json({ error: errorMsg.msg }, { status: response.status })
  }

  return Response.json(await response.json())
}
