export async function getOne(userId: string, authToken: string): Promise<string[]> {
  try {
    const response = await fetch(`${process.env.AUTH_ENDPOINT}/secure/permitted-operations/${userId}`, {
      headers: { Authorization: `BEARER ${authToken}` },
    })
    if (response.status === 401) {
      return Promise.reject<string[]>(401)
    }
    const permissions = await response.json()
    return permissions
  } catch (error) {
    console.error(error)
    return Promise.reject<string[]>()
  }
}
