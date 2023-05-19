import { Product } from '@/types/config'
import { configFetchObject, configPostObject } from './configApiUtil'
import { SecureApiResponse, SecureApiResult } from '../apiUtil'

export async function search(authToken: string): Promise<SecureApiResult<Product[]>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configFetchObject<Product[]>(authToken, 'products')
}

export async function getOne(authToken: string, productCode: string): Promise<SecureApiResult<Product>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configFetchObject<Product>(authToken, `products/${productCode}`)
}

export async function create(authToken: string, product: Product): Promise<SecureApiResponse> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configPostObject(authToken, 'products', product)
}
