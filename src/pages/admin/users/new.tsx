import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import MultiSelect from '@/components/utility/MultiSelect'
import TextInput from '@/components/utility/TextInput'
import { useState } from 'react'

export default function NewUser() {
  const fixedRoles = ['Administrator', 'Tester']
  const [roles, setRoles] = useState<string[]>([])
  return (
    <>
      <PageHeader>Create a User</PageHeader>
      <form action="/api/admin/create-user" method="post" className="p-3">
        <div className="mb-4 sm:w-1 md:w-1/2 xl:w-1/4">
          <TextInput label="User ID" id="userId" name="userId" required={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <TextInput label="Given Names" id="givenNames" name="givenNames" required={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <TextInput label="Family Names" id="familyNames" name="familyNames" required={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <TextInput label="Email Address" id="emailAddress" name="emailAddress" required={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-1/2 xl:w-1/4">
          <TextInput label="Initial Password" id="initialPassword" name="initialPassword" required={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <MultiSelect
            label="Roles"
            id="roles"
            name="roles"
            placeholder="No roles selected"
            options={fixedRoles}
            values={roles}
            onChange={setRoles}
          />
        </div>
        <Button category="primary" className="" type="submit">
          Create
        </Button>
        <Button category="default" type="button" onClick={() => history.back()}>
          Cancel
        </Button>
      </form>
    </>
  )
}
