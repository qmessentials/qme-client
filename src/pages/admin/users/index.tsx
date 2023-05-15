import { withSessionSsr } from '@/lib/withSession'
import PageHeader from '@/components/layout/PageHeader'
import { search } from '@/apis/auth/users'
import { User } from '@/types/auth'
import Link from 'next/link'
import TH from '@/components/utility/TH'
import TD from '@/components/utility/TD'

export default function Users({ users }: { users: User[] }) {
  return (
    <>
      <PageHeader>Users</PageHeader>
      <p className="my-4 mx-2">
        <Link href="users/new">Create a User</Link>
      </p>
      <table className="my-3 mx-2 border-collapse">
        <thead>
          <tr>
            <TH>User ID</TH>
            <TH>Family Names</TH>
            <TH>Given Names</TH>
            <TH>Email Address</TH>
            <TH>Roles</TH>
            <TH>Active?</TH>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <TD>
                <Link href={`users/${user.userId}/edit`}>{user.userId}</Link>
              </TD>
              <TD>{user.familyNames.join(' ')}</TD>
              <TD>{user.givenNames.join(' ')}</TD>
              <TD>{user.emailAddress}</TD>
              <TD>{user.roles.join(' ')}</TD>
              <TD>{user.isActive ? 'Yes' : 'No'}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const users = await search({ roles: [], activeOnly: false }, req.session.authToken)
  return {
    props: {
      users,
    },
  }
})
