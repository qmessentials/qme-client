import { User } from '@/types/auth'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | null>) {
  const authEndpoint = process.env.AUTH_ENDPOINT
  const { userId, password } = req.body
  try {
    const authResponse = await fetch(`${authEndpoint}/logins`, {
      method: 'POST',
      headers: {
        'Content-Type': '/application/json',
      },
      body: JSON.stringify({ userId, password }),
    })
    const authToken = await authResponse.json()
    if (authToken) {
      res.redirect('/')
    }
  } catch (error) {
    console.error(error)
    res.redirect('/login?status=failed')
  }
}
