export const checkIdParams = (request: Request) => {
  const { searchParams } = new URL(request.url)
  return searchParams.get('id')
}
