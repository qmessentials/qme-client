import { User } from '@/types/auth'

export async function getOne(authToken: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.AUTH_ENDPOINT}/secure/user-info-for-tokens/${authToken}`)
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
