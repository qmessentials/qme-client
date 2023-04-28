import { CreateUserRequest, UserSearchCriteria } from '@/types/admin'
import { User } from '@/types/auth'

export async function getOne(userId: string, authToken: string): Promise<User | null> {
  try {
    const response = await fetch(`${process.env.AUTH_ENDPOINT}/secure/users/${userId}`, { headers: { auth: `BEARER: ${authToken}` } })
    const user = await response.json()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function search(criteria: UserSearchCriteria, authToken: string): Promise<User[]> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  const url = new URL(`${process.env.AUTH_ENDPOINT}/secure/users`)
  if (criteria.activeOnly) {
    url.searchParams.append('activeOnly', 'true')
  }
  for (let role in criteria.roles) {
    url.searchParams.append('role', role)
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `BEARER ${authToken}`,
    },
  })
  return await response.json()
}

export async function create(createUserRequest: CreateUserRequest, authToken: string): Promise<void> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  try {
    const createUserResponse = await fetch(`${process.env.AUTH_ENDPOINT}/secure/users`, {
      method: 'POST',
      headers: {
        Authorization: `BEARER ${authToken}`,
        'Content-Type': '/application/json',
      },
      body: JSON.stringify(createUserRequest),
    })
    if (createUserResponse.status !== 201) {
      console.warn(`Unexpected ${createUserResponse.status} response received from create user request`)
    }
  } catch (error) {
    console.error(error)
  }
}
