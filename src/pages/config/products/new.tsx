import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import TextInput from '@/components/utility/TextInput'

export default function NewProduct() {
  return (
    <>
      <PageHeader>New Product</PageHeader>
      <form action="/api/config/products" method="post" className="p-3">
        <div className="mb-4 sm:w-1 md:w-1/3 xl:w-1/4">
          <TextInput label="Product Code" id="productCode" name="productCode" required={true} />
        </div>
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <TextInput label="Description" id="description" name="description" required={true} />
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
