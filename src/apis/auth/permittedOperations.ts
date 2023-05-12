import { SecureApiResult } from '../apiUtil'
import { authSecureFetchObject } from './authApiUtil'

export async function getOne(userId: string, authToken: string): Promise<SecureApiResult<string[]>> {
  try {
    return await authSecureFetchObject<string[]>(authToken, `permitted-operations/${userId}`)
  } catch (error) {
    console.error(error)
    return Promise.reject<string[]>()
  }
}
