import { Login, User } from '@/types/auth'
import { authPublicPostAndGet } from './authApiUtil'
import { postAndGet } from '../apiUtil'

export async function post(login: Login): Promise<User | null> {
  const userInfo: User = await authPublicPostAndGet('', login)
  return userInfo
}
