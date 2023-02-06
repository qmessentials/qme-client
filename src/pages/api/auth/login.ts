import { withSessionRoute } from '@/lib/withSession'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<null>) {
  const authEndpoint = process.env.AUTH_ENDPOINT
  const { userId, password } = JSON.parse(req.body)
  try {
    const authResponse = await fetch(`${authEndpoint}/public/logins`, {
      method: 'POST',
      headers: {
        'Content-Type': '/application/json',
      },
      body: JSON.stringify({ userId, password }),
    })
    const userInfo = await authResponse.json()
    if (userInfo) {
      req.session.userId = userId
      await req.session.save()
      console.log(`Saved session with userId ${userId}`)
      res.status(201).send(null)
    } else {
      res.status(401).send(null)
    }
  } catch (error) {
    console.error(error)
    res.status(400).send(null)
  }
})
