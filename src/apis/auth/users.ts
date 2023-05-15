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
  const createUserResponse = await authSecurePostObject(authToken, 'users', createUserRequest)
  if (createUserResponse === 'Forbidden') {
    throw 'Unexpected forbidden response'
  }
  if (createUserResponse === 'Unauthorized') {
    return Promise.reject('Unauthorized')
  }
  if ((createUserResponse as Response).status !== 201) {
    throw 'Failed to create user'
  }
}
