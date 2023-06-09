import { create, search } from '@/apis/config/tests'
import { withSessionRoute } from '@/lib/withSession'
import { Test } from '@/types/config'
import { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<Test[]>) {
  if (req.method === 'POST') {
    try {
      const test: Test = { ...req.body }
      console.log(['req.body', req.body])
      console.log(['test', test])
      const postResponse = await create(req.session.authToken, test)
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
      res.redirect('/config/tests')
    } catch (error) {
      throw error
    }
  } else if (req.method === 'GET') {
    const { lastKey } = req.query
    if (Array.isArray(lastKey)) {
      throw 'Unexpected multiple last keys'
    }
    const testsApiResult = await search(req.session.authToken, 5, lastKey ?? null)
    if (testsApiResult === 'Forbidden') {
      throw 'Unexpected forbidden response'
    }
    if (testsApiResult === 'Unauthorized') {
      res.status(401)
      return
    }
    const tests: Test[] = testsApiResult ?? []
    res.status(200).json(tests)
  } else {
    res.statusCode = 405
  }
})
