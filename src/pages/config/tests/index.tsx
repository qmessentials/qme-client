import { search } from '@/apis/config/tests'
import PageHeader from '@/components/layout/PageHeader'
import TD from '@/components/utility/TD'
import TH from '@/components/utility/TH'
import { withSessionSsr } from '@/lib/withSession'
import { Test } from '@/types/config'
import Link from 'next/link'

export default function Tests({ tests }: { tests: Test[] }) {
  return (
    <>
      <PageHeader>Tests</PageHeader>
      <p className="my-4 mx-2">
        <Link href="tests/new">Create a Test</Link>
      </p>
      <table className="my-3 mx-2 border-collapse">
        <thead>
          <tr>
            <TH>Test Name</TH>
            <TH>Unit Type</TH>
            <TH>References</TH>
            <TH>Standards</TH>
            <TH>Available Modifiers</TH>
          </tr>
        </thead>
        <tbody>
          {(tests ?? []).map((t) => (
            <tr key={t.testName}>
              <TD>
                <Link href={`tests/${t.testName}`}>{t.testName}</Link>
              </TD>
              <TD>{t.unitType}</TD>
              <TD>{(t.references ?? []).join('\n')}</TD>
              <TD>{(t.standards ?? []).join('\n')}</TD>
              <TD>{(t.availableModifiers ?? []).join(' ')}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const testsApiResult = await search(req.session.authToken)
  if (testsApiResult === 'Forbidden') {
    throw 'Unexpected forbidden response'
  }
  if (testsApiResult === 'Unauthorized') {
    return {
      redirect: {
        destination: '/api/auth/logout',
        permanent: false,
      },
    }
  }
  const tests: Test[] = testsApiResult ?? []
  return {
    props: { tests },
  }
})
