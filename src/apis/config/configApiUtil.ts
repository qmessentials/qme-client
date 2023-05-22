import { SecureApiResponse, SecureApiResult, secureFetchObject, securePostObject, securePutObject } from '../apiUtil'

export const configEndpoint = `${process.env.CONFIG_ENDPOINT}`

export async function configFetchObject<T>(
  authToken: string,
  resource: string,
  init?: RequestInit | undefined
): Promise<SecureApiResult<T>> {
  return await secureFetchObject<T>(authToken, `${configEndpoint}/${resource}`, init)
}

export async function configPostObject<T>(authToken: string, resource: string, obj: T): Promise<SecureApiResponse> {
  return await securePostObject(authToken, `${configEndpoint}/${resource}`, obj)
}

export async function configPutObject<T>(
  authToken: string,
  resource: string,
  obj: T,
  keySelector: (value: T) => string
): Promise<SecureApiResponse> {
  return await securePutObject(authToken, `${configEndpoint}/${resource}`, obj, keySelector)
}
