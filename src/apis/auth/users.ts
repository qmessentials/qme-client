import { CreateUserRequest, UserSearchCriteria } from '@/types/admin'
import { User } from '@/types/auth'
import { SecureApiResult, secureFetchObject } from '../apiUtil'
import { authSecureEndpoint, authSecureFetchObject, authSecurePostObject } from './authApiUtil'

export async function getOne(userId: string, authToken: string): Promise<SecureApiResult<User>> {
  return await authSecureFetchObject(authToken, `users/${userId}`)
}

export async function search(criteria: UserSearchCriteria, authToken: string): Promise<SecureApiResult<User[]>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  const url = new URL(`${authSecureEndpoint}/users`)
  if (criteria.activeOnly) {
    url.searchParams.append('activeOnly', 'true')
  }
  for (let role in criteria.roles) {
    url.searchParams.append('role', role)
  }
  return await secureFetchObject<User[]>(authToken, url)
}

export async function create(createUserRequest: CreateUserRequest, authToken: string): Promise<void> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  try {
    const createUserResponse = await authSecurePostObject(authToken, 'user', createUserRequest)
    if (createUserResponse instanceof Response && createUserResponse.status !== 201) {
      console.warn(`Unexpected ${createUserResponse.status} response received from create user request`)
    }
  } catch (error) {
    console.error(error)
  }
}
