import { checkIdParams } from '@/lib/form/check-form'
import { getFormIds } from '@/lib/form/get-form-ids'
import { getFormSchema } from '@/lib/form/get-form-schema'

export async function GET(request: Request) {
  // checking id
  const id = checkIdParams(request)
  if (id === null) {
    return Response.json({ error: 'ID not provided' }, { status: 400 })
  }

  // get from nocodb
  const form = await getFormSchema(id)
  return Response.json(form)
}

export async function POST(request: Request) {
  // checking id & body & form-name
  const id = checkIdParams(request)
  if (id === null) {
    return Response.json({ error: 'ID not provided' }, { status: 400 })
  }

  const body = await request.json()

  const tableIdResponse = await getFormIds(id)
  if (tableIdResponse === null) {
    return Response.json({ error: 'No matching form name' }, { status: 400 })
  }
  const tableID = tableIdResponse.TableId

  // post to nocodb
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

  // sent back error message (if any)
  if (!response.ok) {
    const errorMsg = await response.json()
    return Response.json({ error: errorMsg.msg }, { status: response.status })
  }
  return Response.json(await response.json())
}
