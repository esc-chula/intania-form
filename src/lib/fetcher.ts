import { UIDataType } from '@/types/ui-data'

interface IDMappingResponse {
  Id: number
  FormViewID: string
  TableID: string
}

export const getNocoID = async (
  name: string
): Promise<IDMappingResponse | null> => {
  const response2 = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/tables/${process.env.ID_MAPPING_TABLE_ID}/records/`,
    {
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
      },
      next: { revalidate: 60 },
    }
  )
  const allForm = (await response2.json()).list

  const formIdData = allForm.find((item: { CustomId: string }) => {
    if (item.CustomId === name) {
      return true
    }
  })

  if (formIdData === undefined) {
    return null
  }
  const id = formIdData.Id

  const response = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/tables/${process.env.ID_MAPPING_TABLE_ID}/records/${id}`,
    {
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
      },
      next: { revalidate: 60 },
    }
  )
  const data = await response.json()
  return data
}

export const getColumnDetail = async (
  columnID: string
): Promise<{
  label: string
  uidt: keyof typeof UIDataType
  columnName: string
  colOptions?: string[]
}> => {
  const response = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/meta/columns/${columnID}`,
    {
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
      },
      next: { revalidate: 60 },
    }
  )
  const data = await response.json()
  return {
    label: data.title,
    uidt: data.uidt,
    columnName: data.column_name,
    colOptions: data.colOptions?.options.map(
      (option: { title: string }) => option.title
    ),
  }
}
