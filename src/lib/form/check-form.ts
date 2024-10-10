export const checkIdParams = (request: Request) => {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return null
  }
  return id
}
