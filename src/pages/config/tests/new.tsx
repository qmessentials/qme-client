import { search } from '@/apis/config/units'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import ArrayInput from '@/components/utility/ArrayInput'
import SelectInput from '@/components/utility/SelectInput'
import TextInput from '@/components/utility/TextInput'
import { withSessionSsr } from '@/lib/withSession'
import { Unit } from '@/types/config'
import { FormEvent, useState } from 'react'

export default function NewTest({ unitTypes }: { unitTypes: string[] }) {
  const [testName, setTestName] = useState('')
  const [unitType, setUnitType] = useState('')
  const [references, setReferences] = useState<string[]>([])
  const [standards, setStandards] = useState<string[]>([])
  const [availableModifiers, setAvailableModifiers] = useState<string[]>([])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/config/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testName,
        unitType,
        references,
        standards,
        availableModifiers,
      }),
    })
    if (response.ok) {
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/config/tests`
    } else {
      console.warn(response)
      window.location.href = '/_error'
    }
  }

  return (
    <>
      <PageHeader>New Test</PageHeader>
      <form onSubmit={handleSubmit} className="p-3">
        <div className="mb-4 sm:w-1 md:w-1/3 xl:w-1/4">
          <TextInput label="Test Name" id="testName" name="testName" required={true} value={testName} onChange={setTestName} />
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
          Create
        </Button>
        <Button category="default" type="button" onClick={() => history.back()}>
          Cancel
        </Button>
      </form>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const unitsApiResult = await search(req.session.authToken)
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
    props: { unitTypes },
  }
})
