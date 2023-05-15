import PageHeader from '@/components/layout/PageHeader'
import { withSessionSsr } from '@/lib/withSession'
import { User } from '@/types/auth'
import { getCachedPermissions, getCachedUser, setCachedPermissions, setCachedUser } from '@/util/cache'
import { getOne as getOneUser } from '../apis/auth/users'
import { getOne as getOnePermissions } from '../apis/auth/permittedOperations'
import MenuBox, { MenuBoxProps, allMenuGroups } from '@/components/MenuBox'

export default function Home({ user, permissions }: { user: User | null; permissions: string[] }) {
  const menuGroups = allMenuGroups
    .map((mg) => {
      return { ...mg, menuItems: mg.menuItems.filter((mi) => permissions.includes(mi.text) || mi.alwaysEnabled) }
    })
    .filter((mg) => mg.menuItems.length > 0)
  return (
    <>
      <PageHeader>Welcome, {[...(user?.givenNames ?? []), ...(user?.familyNames ?? [])].join(' ')} </PageHeader>
      {menuGroups.map((mg) => (
        <MenuBox key={mg.title} title={mg.title} menuItems={mg.menuItems} />
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
