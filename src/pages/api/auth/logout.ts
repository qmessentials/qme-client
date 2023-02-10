import { withSessionRoute } from '@/lib/withSession'
import { removeCachedUser } from '@/util/cache'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<null>) {
  await removeCachedUser(req.session.userId)
  req.session.destroy()
  res.redirect('/')
})
