import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import TD from '@/components/utility/TD'
import TH from '@/components/utility/TH'
import { Test } from '@/types/config'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'

export default function Tests() {
  const [tests, setTests] = useState<Test[]>([])
  useEffect(() => {
    ;(async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/tests`)
      const result: Test[] = await (await fetch(url)).json()
      setTests(result)
    })()
  }, [])

  const loadMore = async () => {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/tests?lastKey=${tests[tests.length - 1].testName}`)
    const result: Test[] = await (await fetch(url)).json()
    setTests((tests) => [...tests, ...result])
  }

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
      <Button onClick={loadMore} category="default">
        Load More
      </Button>
    </>
  )
}
