import { User } from '@/types/auth'
import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_URL as string)

async function getCache(key: string): Promise<any | null> {
  const value = await redis.get(key)
  return value ? JSON.parse(value) : null
}

async function setCache(key: string, value: any | null) {
  if (value) {
    await redis.set(key, JSON.stringify(value), 'EX', 900)
  } else {
    await redis.del(key)
  }
}

export async function getCachedUser(userId: string): Promise<User | null> {
  console.log(`Checking cache for user ID '${userId}'`)
  const user: User | null = await getCache(userId)
  if (!user) {
    return null
  }
  return user
}

export async function setCachedUser(user: User) {
  await setCache(user.userId, user)
}

export async function removeCachedUser(userId: string) {
  await setCache(userId, null)
}

export async function getCachedPermissions(userId: string): Promise<string[] | null> {
  return await getCache(`permissions for ${userId}`)
}

export async function setCachedPermissions(userId: string, permissions: string[]) {
  return await setCache(`permissions for ${userId}`, permissions)
}
