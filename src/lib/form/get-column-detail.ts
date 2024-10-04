import { UIDataType } from '@/types/ui-data'

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
