import { create } from '@/apis/auth/users'
import { withSessionRoute } from '@/lib/withSession'
import { CreateUserRequest } from '@/types/admin'
import type { NextApiRequest, NextApiResponse } from 'next'

export default withSessionRoute(async function handler(req: NextApiRequest, res: NextApiResponse<null>) {
  const createUserRequest: CreateUserRequest = {
    ...req.body,
    givenNames: req.body.givenNames.split(' '),
    familyNames: req.body.familyNames.split(' '),
    roles: req.body.roles.split('|'), //It's a pipe because this one is constructed in a hidden field rather than being user-input
  }
  try {
    await create(createUserRequest, req.session.authToken)
    res.redirect('/admin/users')
  } catch (error) {
    console.error(error)
    res.status(400).send(null)
  }
})
