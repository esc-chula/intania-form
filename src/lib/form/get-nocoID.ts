interface IDMappingResponse {
  Id: number
  FormViewID: string
  TableID: string
}

export const getNocoID = async (
  name: string
): Promise<IDMappingResponse | null> => {
  const id = await getIdByFormName(name)
  if (id === null) {
    return null
  }

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

const getIdByFormName = async (name: string) => {
  const response = await fetch(
    `${process.env.NOCODB_BASE_URL}/api/v2/tables/${process.env.ID_MAPPING_TABLE_ID}/records/`,
    {
      headers: {
        'xc-token': process.env.NOCODB_XC_TOKEN ?? '',
      },
      next: { revalidate: 60 },
    }
  )
  const allForm = (await response.json()).list

  const formIdData = allForm.find((item: { CustomId: string }) => {
    if (item.CustomId === name) {
      return true
    }
  })

  if (formIdData === undefined) {
    return null
  }
  return formIdData.Id
}
