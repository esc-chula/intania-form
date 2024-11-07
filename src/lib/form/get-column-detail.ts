import type { FormColumn } from '@/types'

export const getColumnDetail = async (
  columnID: string
): Promise<Omit<FormColumn, 'description' | 'order' | 'required'>> => {
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
    id: data.id,
    label: data.title,
    uidt: data.uidt,
    name: data.column_name,
    options: data.colOptions?.options.map(
      (option: { id: string; title: string }) => ({
        id: option.id,
        title: option.title,
      })
    ),
  }
}
