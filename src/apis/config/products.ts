import { Product } from '@/types/config'
import { configFetchObject } from './configApiUtil'
import { SecureApiResult } from '../apiUtil'

export async function search(authToken: string): Promise<SecureApiResult<Product[]>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configFetchObject<Product[]>(authToken, 'products')
}
