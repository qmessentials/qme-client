import PageHeader from '@/components/layout/PageHeader'
import { withSessionSsr } from '@/lib/withSession'
import { User } from '@/types/auth'
import { getCachedPermissions, getCachedUser, setCachedPermissions, setCachedUser } from '@/util/cache'
import { getOne as getOneUser } from '../apis/auth/users'
import { getOne as getOnePermissions } from '../apis/auth/permittedOperations'
import MenuBox from '@/components/MenuBox'
import { redirect } from 'next/dist/server/api-utils'

export default function Home({ user, permissions }: { user: User | null; permissions: string[] }) {
  const userPermissions: { [key: string]: { [key: string]: boolean } } = {
    Admin: {
      'Search for Users': false,
    },
    'User Management': {
      'Change Password': true,
      'Log Out': true,
    },
  }
  for (let permission of permissions) {
    let done = false
    for (let category in userPermissions) {
      if (Object.hasOwn(userPermissions[category], permission)) {
        userPermissions[category][permission] = true
        done = true
        break
      }
    }
    if (done) break
  }

  const permissionLinks: { [key: string]: string } = {
    'Log Out': '/api/auth/logout',
    'Change Password': '/auth/change-password',
    'Search for Users': '/admin/users',
  }

  return (
    <>
      <PageHeader>Welcome, {[...(user?.givenNames ?? []), ...(user?.familyNames ?? [])].join(' ')} </PageHeader>
      {Object.keys(userPermissions).map((category) => (
        <MenuBox
          key={category}
          title={category}
          menuItems={Object.keys(userPermissions[category])
            .filter((permission) => userPermissions[category][permission])
            .map((permission) => {
              return { text: permission, href: permissionLinks[permission] }
            })}
        />
      ))}
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  let [userCacheHit, user] = await getCachedUser(req.session.userId)
  if (!userCacheHit) {
    const userApiResponse = await getOneUser(req.session.userId, req.session.authToken)
    if (userApiResponse === 'Forbidden') {
      throw 'Unexpected forbidden response trying to retrieve current user'
    }
    if (userApiResponse === 'Unauthorized') {
      req.session.destroy()
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    if (user) {
      await setCachedUser(user)
    }
  }
  let [permissionsCacheHit, permissions] = await getCachedPermissions(req.session.userId)
  if (!permissionsCacheHit) {
    const permissionsApiResponse = await getOnePermissions(req.session.userId, req.session.authToken)
    if (permissionsApiResponse === 'Forbidden') {
      throw 'Unexpected forbidden response on user permissions'
    }
    if (permissionsApiResponse === 'Unauthorized') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }
    setCachedPermissions(req.session.userId, permissionsApiResponse)
  }
  return {
    props: {
      user,
      permissions,
    },
  }
})
