import { SecureApiResult, secureFetchObject } from '../apiUtil'

export const configEndpoint = `${process.env.CONFIG_ENDPOINT}`

export async function configFetchObject<T>(
  authToken: string,
  resource: string,
  init?: RequestInit | undefined
): Promise<SecureApiResult<T>> {
  return await secureFetchObject<T>(authToken, `${configEndpoint}/${resource}`, init)
}
