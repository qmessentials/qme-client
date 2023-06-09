import { Test } from '@/types/config'
import { configFetchObject, configFetchPagedObjects, configPostObject, configPutObject } from './configApiUtil'
import { SecureApiResponse, SecureApiResult } from '../apiUtil'

export async function search(authToken: string, pageSize: number, lastKey: string | null): Promise<SecureApiResult<Test[]>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configFetchPagedObjects<Test[]>(authToken, 'tests', pageSize, lastKey)
}

export async function getOne(authToken: string, testName: string): Promise<SecureApiResult<Test>> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configFetchObject<Test>(authToken, `tests/${testName}`)
}

export async function create(authToken: string, test: Test): Promise<SecureApiResponse> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configPostObject(authToken, 'tests', test)
}

export async function update(authToken: string, test: Test): Promise<SecureApiResponse> {
  if (!authToken) {
    throw 'Auth token is required'
  }
  return await configPutObject(authToken, 'tests', test, (test) => test.testName)
}