export const checkIdParams = (request: Request) => {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return null
  }
  return id
}

export const checkMissingField = async (body: Promise<Response>) => {
  if (Object.values(body).some((value) => value === '')) {
    return true
  }
  return false
}
