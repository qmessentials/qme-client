import { create } from '@/apis/config/products'
import { withSessionRoute } from '@/lib/withSession'
import { Product } from '@/types/config'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<null>) {
  if (req.method === 'POST') {
    try {
      const product: Product = { ...req.body }
      const postResponse = await create(req.session.authToken, product)
      if (postResponse === 'Forbidden') {
        throw 'Unexpected forbidden response'
      }
      if (postResponse === 'Unauthorized') {
        console.warn('Post failed due to authentication failure')
        res.redirect('/api/auth/logout')
        return
      }
      if (postResponse.status !== 201) {
        throw `Post responded with unexpected status ${postResponse.status}`
      }
      res.redirect('/config/products')
    } catch (error) {
      throw error
    }
  } else {
    res.statusCode = 405
  }
})
