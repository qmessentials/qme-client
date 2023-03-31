import { User } from '@/types/auth'

export async function getOne(userId: string, authToken: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.AUTH_ENDPOINT}/secure/users/${userId}`, { headers: { auth: `BEARER: ${authToken}` } })
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
