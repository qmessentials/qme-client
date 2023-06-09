export type SecureApiResult<T> = T | 'Unauthorized' | 'Forbidden'
export type SecureApiResponse = SecureApiResult<Response>

export async function secureFetch(authToken: string, input: RequestInfo | URL, init?: RequestInit | undefined): Promise<SecureApiResponse> {
  if (!authToken || authToken === '') {
    throw 'Missing auth token'
  }
  const initPlusAuth = { ...init, headers: { ...init?.headers, Authorization: `Bearer ${authToken}` } }
  const response = await fetch(input, initPlusAuth)
  if (response.status === 401) {
    return 'Unauthorized'
  }
  if (response.status === 403) {
    return 'Forbidden'
  }
  return response
}

export async function secureFetchObject<T>(
  authToken: string,
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<SecureApiResult<T>> {
  const result = await secureFetch(authToken, input, init)
  if (result instanceof Response) {
    return await getObjectFromResult(result)
  }
  return result
}

export async function secureFetchPagedObjects<T>(
  authToken: string,
  input: RequestInfo | URL,
  pageSize: number,
  lastKey: string | null,
  init?: RequestInit | undefined
): Promise<SecureApiResult<T>> {
  let newUrl: URL
  if (input instanceof URL) {
    newUrl = input
  } else {
    newUrl = new URL(input as string)
  }
  newUrl.searchParams.append('pageSize', `${pageSize}`)
  if (lastKey !== null) {
    newUrl.searchParams.append('lastKey', lastKey)
  }
  return await secureFetchObject<T>(authToken, newUrl, init)
}

export async function securePostObject<T>(authToken: string, input: RequestInfo | URL, obj: T): Promise<SecureApiResponse> {
  return await secureFetch(authToken, input, getInitForPost(obj))
}

export async function securePostAndGet<TPost, TResult>(
  authToken: string,
  input: RequestInfo | URL,
  postObject: TPost
): Promise<SecureApiResult<TResult>> {
  const result = await securePostObject(authToken, input, postObject)
  if (result instanceof Response) {
    return await getObjectFromResult(result)
  }
  return result
}

export async function postAndGet<TPost, TResult>(input: RequestInfo | URL, postObject: TPost): Promise<TResult> {
  return await getObjectFromResult(await fetch(input, getInitForPost(postObject)))
}

export async function securePutObject<T>(
  authToken: string,
  input: RequestInfo | URL,
  obj: T,
  keySelector: (value: T) => string
): Promise<SecureApiResponse> {
  const key = keySelector(obj)
  return await secureFetch(authToken, `${input}/${key}`, getInitForPut(obj))
}

function getInitForPost<T>(obj: T): RequestInit {
  return {
    method: 'POST',
    headers: {
      'Content-Type': '/application/json',
    },
    body: JSON.stringify(obj),
  }
}

function getInitForPut<T>(obj: T): RequestInit {
  return {
    method: 'PUT',
    headers: {
      'Content-Type': '/application/json',
    },
    body: JSON.stringify(obj),
  }
}

async function getObjectFromResult<T>(response: Response) {
  const obj: T = await response.json()
  return obj
}
