import { User } from '@/types/auth'
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL as string)

export type CacheResult<T> = [found: boolean, result: T | undefined]

async function getCache<T>(key: string): Promise<CacheResult<T>> {
  const value = await redis.get(key)
  if (!value) {
    return [false, undefined]
  }
  return [true, JSON.parse(value)]
}

async function setCache(key: string, value: any | null) {
  if (value) {
    await redis.set(key, JSON.stringify(value), 'EX', 900)
  } else {
    await redis.del(key)
  }
}

export async function getCachedUser(userId: string): Promise<CacheResult<User>> {
  console.info(`Checking cache for user ID '${userId}'`)
  return await getCache(userId)
}

export async function setCachedUser(user: User) {
  await setCache(user.userId, user)
}

export async function removeCachedUser(userId: string) {
  await setCache(userId, null)
}

export async function getCachedPermissions(userId: string): Promise<CacheResult<string[]>> {
  return await getCache(`permissions for ${userId}`)
}

export async function setCachedPermissions(userId: string, permissions: string[]) {
  return await setCache(`permissions for ${userId}`, permissions)
}
