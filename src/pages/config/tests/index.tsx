import { search } from '@/apis/config/tests'
import { search as searchUnits } from '@/apis/config/units'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import MultiSelect from '@/components/utility/MultiSelect'
import TD from '@/components/utility/TD'
import TH from '@/components/utility/TH'
import TextInput from '@/components/utility/TextInput'
import { withSessionSsr } from '@/lib/withSession'
import { Test, TestCriteria, Unit } from '@/types/config'
import { queryStringify } from '@/util/functions'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

export default function Tests({
  unitTypes,
  testCriteria,
  lastKey,
}: {
  unitTypes: string[]
  testCriteria: TestCriteria
  lastKey: string | null
}) {
  const [namePattern, setNamePattern] = useState(testCriteria.namePattern)
  const [selectedUnitTypes, setSelectedUnitTypes] = useState<string[]>(testCriteria.unitType ?? [])
  const [tests, setTests] = useState<Test[]>([])

  useEffect(() => {
    const fetchTests = async () => {
      const query = queryStringify({ ...testCriteria })
      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/tests?${query}`)
      const results: Test[] = await (await fetch(url)).json()
      setTests((tests) => [...tests, ...results])
    }
    fetchTests()
  }, [testCriteria])

  const applyFilter = (namePattern: string | null, selectedUnitTypes: string[] | null) => {
    const params = new URLSearchParams()
    if (namePattern) {
      params.set('namePattern', namePattern)
    }
    for (let selectedUnitType of selectedUnitTypes ?? []) {
      params.append('selectedUnitTypes', selectedUnitType)
    }
    window.location.replace(`${window.location.pathname}?${params.toString()}`)
  }

  const loadMore = async () => {
    const lastKey = tests[tests.length - 1].testName
    const query = queryStringify({ ...testCriteria, lastKey })
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/tests?${query}`)
    const results: Test[] = await (await fetch(url)).json()
    setTests((tests) => [...tests, ...results])
  }

  return (
    <>
      <PageHeader>Tests</PageHeader>
      <div className="flex space-x-4">
        <TextInput
          name="namePattern"
          placeholder="Name"
          value={namePattern ?? ''}
          onChange={setNamePattern}
          onBlur={() => applyFilter(namePattern, selectedUnitTypes)}
        />
        <MultiSelect
          name="unitType"
          options={unitTypes}
          placeholder="Unit Types"
          values={selectedUnitTypes}
          onChange={(value) => {
            setSelectedUnitTypes(value)
            applyFilter(namePattern, value) //setSelectedUnitTypes is async, may not have finished yet
          }}
        />
      </div>
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
      <Button onClick={() => loadMore()} category="default">
        Load More
      </Button>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req, query }) {
  const unitsApiResult = await searchUnits(req.session.authToken)
  if (unitsApiResult === 'Forbidden') {
    throw 'Unexpected forbidden response'
  }
  if (unitsApiResult === 'Unauthorized') {
    return {
      redirect: {
        destination: '/api/auth/logout',
        permanent: false,
      },
    }
  }
  const units: Unit[] = unitsApiResult ?? []
  const unitTypes: string[] = Array.from(new Set(units.map((u) => u.unitType)))
  const queryUnitTypes = query.selectedUnitTypes ?? null
  const testCriteria: TestCriteria = {
    namePattern: (query.namePattern as string) ?? null,
    unitType: queryUnitTypes === null ? null : Array.isArray(queryUnitTypes) ? queryUnitTypes : [queryUnitTypes],
  }
  const lastKey = (query.lastKey as string) ?? null
  return {
    props: { unitTypes, testCriteria, lastKey },
  }
})
