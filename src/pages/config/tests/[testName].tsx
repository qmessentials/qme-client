import { search as searchUnitTests } from '@/apis/config/units'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import ArrayInput from '@/components/utility/ArrayInput'
import SelectInput from '@/components/utility/SelectInput'
import TextInput from '@/components/utility/TextInput'
import { withSessionSsr } from '@/lib/withSession'
import { Test, Unit } from '@/types/config'
import { FormEvent, useState } from 'react'
import { getOne, search } from '@/apis/config/tests'

export default function TestPage({ test, unitTypes }: { test: Test; unitTypes: string[] }) {
  const [unitType, setUnitType] = useState(test.unitType)
  const [references, setReferences] = useState(test.references)
  const [standards, setStandards] = useState(test.standards)
  const [availableModifiers, setAvailableModifiers] = useState(test.availableModifiers)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/tests/${encodeURIComponent(test.testName)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testName: test.testName,
        unitType,
        references,
        standards,
        availableModifiers,
      }),
    })
    if (response.ok) {
      history.back()
    } else {
      console.warn(response)
      window.location.href = '/_error'
    }
  }

  return (
    <>
      <PageHeader>{test.testName}</PageHeader>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-4 sm:w-1 md:w-1/3 xl:w-1/4">
          <TextInput label="Test Name" id="testName" name="testName" required={true} value={test.testName} disabled={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <SelectInput
            label="Unit Type"
            id="unitType"
            name="unitType"
            value={unitType}
            onChange={setUnitType}
            required={true}
            options={unitTypes.map((ut) => {
              return { value: ut, text: ut }
            })}
          />
          <ArrayInput
            label="References (separate lines)"
            id="references"
            name="references"
            value={references}
            onChange={setReferences}
            delimiters={['\n']}
          />
          <ArrayInput
            label="Standards (separate lines or semicolons)"
            id="standards"
            name="standards"
            value={standards}
            onChange={setStandards}
            delimiters={['\n', ';']}
          />
          <ArrayInput
            label="Available Modifiers (spaces, commas, semicolons, or separate lines)"
            id="availableModifiers"
            name="availableModifiers"
            value={availableModifiers}
            onChange={setAvailableModifiers}
            delimiters={[' ', ';', ',', '\n']}
          />
        </div>
        <Button category="primary" className="mx-2" type="submit">
          Update
        </Button>
        <Button category="default" type="button" onClick={() => history.back()}>
          Cancel
        </Button>
      </form>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req, query }) {
  if (!query.testName) {
    throw 'Test name not specified'
  }
  if (Array.isArray(query.testName)) {
    throw 'Only one test name can be specified'
  }
  const testsApiResult = await getOne(req.session.authToken, query.testName)
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
  const test: Test = testsApiResult
  const unitsApiResult = await searchUnitTests(req.session.authToken)
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
  return {
    props: { test, unitTypes },
  }
})
