import PageHeader from '@/components/layout/PageHeader'
import { withSessionSsr } from '@/lib/withSession'
import { User } from '@/types/auth'
import { getCachedUser, setCachedUser } from '@/util/cache'
import Link from 'next/link'
import { getOne as getOneUser } from '../apis/auth/userInfoForToken'

export default function Home({ user }: { user: User | null }) {
  return (
    <>
      {user ? <PageHeader>Welcome, {[...user.givenNames, ...user.familyNames].join(' ')} </PageHeader> : <></>}
      <p>
        <Link href="/api/auth/logout">Log Out</Link>
      </p>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  let user = await getCachedUser(req.session.userId)
  if (!user) {
    user = await getOneUser(req.session.authToken)
    if (user) {
      await setCachedUser(user)
    }
  }
  return {
    props: {
      user,
    },
  }
})
