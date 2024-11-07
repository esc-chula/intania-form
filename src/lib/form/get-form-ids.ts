interface FormIds {
  Id: string
  CustomId: string
  TableID: string
  FormViewID: string
}

export const getFormIds = async (CustomId: string): Promise<FormIds | null> => {
  const response = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/tables/${process.env.ID_MAPPING_TABLE_ID}/records`,
    {
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
      },
      next: { revalidate: 60 },
    }
  )
  const data = await response.json()
  const allForm = data.list as FormIds[]

  const formIdData = allForm.find(
    (item: { CustomId: string }) => item.CustomId === CustomId
  )

  return formIdData ?? null
}
