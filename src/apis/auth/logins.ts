import { Login, User } from '@/types/auth'

export async function post(login: Login): Promise<User | null> {
  const authResponse = await fetch(`${process.env.AUTH_ENDPOINT}/public/logins`, {
    method: 'POST',
    headers: {
      'Content-Type': '/application/json',
    },
    body: JSON.stringify(login),
  })
  const userInfo: User | null = await authResponse.json()
  return userInfo
}
