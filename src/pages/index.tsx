import PageHeader from '@/components/layout/PageHeader'
import { withSessionSsr } from '@/lib/withSession'
import { User } from '@/types/auth'
import { getCachedPermissions, getCachedUser, setCachedPermissions, setCachedUser } from '@/util/cache'
import { getOne as getOneUser } from '../apis/auth/users'
import { getOne as getOnePermissions } from '../apis/auth/permittedOperations'
import MenuBox from '@/components/MenuBox'

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
  let user = await getCachedUser(req.session.userId)
  if (!user) {
    user = await getOneUser(req.session.userId, req.session.authToken)
    if (user) {
      await setCachedUser(user)
    }
  }
  let permissions = await getCachedPermissions(req.session.userId)
  if (!permissions) {
    try {
      permissions = await getOnePermissions(req.session.userId, req.session.authToken)
      if (permissions) {
        setCachedPermissions(req.session.userId, permissions)
      }
    } catch (error) {
      if (error === 401) {
        console.warn('401')
      }
    }
  }
  return {
    props: {
      user,
      permissions,
    },
  }
})
