import { Unit } from '@/types/config'
import { configFetchObject } from './configApiUtil'
import { SecureApiResult } from '../apiUtil'

export async function search(authToken: string): Promise<SecureApiResult<Unit[]>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configFetchObject<Unit[]>(authToken, 'units')
}
