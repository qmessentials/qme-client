import { User } from '@/types/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<User>) {
  res.status(200).json({ name: 'Test User 1', roles: [] })
}
