import { update } from '@/apis/config/tests'
import { withSessionRoute } from '@/lib/withSession'
import { Test } from '@/types/config'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<null>) {
  if (req.method === 'POST') {
    try {
      const test: Test = { ...req.body }
      const putResponse = await update(req.session.authToken, test)
      if (putResponse === 'Forbidden') {
        throw 'Unexpected forbidden response'
      }
      if (putResponse === 'Unauthorized') {
        console.warn('Put failed due to authentication failure')
        res.redirect('/api/auth/logout')
        return
      }
      if (putResponse.status !== 200) {
        throw `Put responded with unexpected status ${putResponse.status}`
      }
      res.redirect('/config/tests')
    } catch (error) {
      throw error
    }
  } else {
    res.statusCode = 405
  }
})
