import { SecureApiResponse, SecureApiResult, postAndGet, secureFetch, secureFetchObject, securePostObject } from '../apiUtil'

export const authPublicEndpoint: string = `${process.env.AUTH_ENDPOINT}/public`
export const authSecureEndpoint: string = `${process.env.AUTH_ENDPOINT}/secure`

export async function authPublicPostAndGet<TPost, TResult>(resource: string, postObject: TPost): Promise<TResult> {
  return await postAndGet(`${authPublicEndpoint}/${resource}`, postObject)
}

export async function authSecureFetchObject<T>(
  authToken: string,
  resource: string,
  init?: RequestInit | undefined
): Promise<SecureApiResult<T>> {
  return await secureFetchObject<T>(authToken, `${authSecureEndpoint}/${resource}`, init)
}

export async function authSecurePostObject<T>(authToken: string, resource: string, obj: T): Promise<SecureApiResponse> {
  return await securePostObject(authToken, `${authSecureEndpoint}/${resource}`, obj)
}
