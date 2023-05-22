import { getOne } from '@/apis/config/products'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/utility/Button'
import TextInput from '@/components/utility/TextInput'
import { withSessionSsr } from '@/lib/withSession'
import { Product } from '@/types/config'
import { useState } from 'react'

export default function ProductPage({ product }: { product: Product }) {
  const [productCode, setProductCode] = useState(product.productCode)
  const [description, setDescription] = useState(product.description)

  return (
    <>
      <PageHeader>Product {product.productCode}</PageHeader>
      <form action={`/api/config/products/${productCode}`} method="post" className="p-3">
        <div className="mb-4 sm:w-1 md:w-1/3 xl:w-1/4">
          <TextInput label="Product Code" id="productCodeDisplay" disabled required={true} value={productCode} onChange={setProductCode} />
        </div>
        <input type="hidden" value={productCode} name="productCode" />
        <div className="mb-4 sm:w-1 md:w-2/3 xl:w-1/2">
          <TextInput
            label="Description"
            id="description"
            name="description"
            required={true}
            value={description}
            onChange={setDescription}
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
  if (!query.productCode) {
    throw 'Product code not specified'
  }
  if (Array.isArray(query.productCode)) {
    throw 'Only one product code can be specified'
  }
  const productsApiResult = await getOne(req.session.authToken, query.productCode)
  if (productsApiResult === 'Forbidden') {
    throw 'Unexpected forbidden response'
  }
  if (productsApiResult === 'Unauthorized') {
    console.warn('Post failed due to authentication failure')
    return {
      redirect: {
        destination: '/api/auth/logout',
        permanent: false,
      },
    }
  }
  return {
    props: { product: productsApiResult },
  }
})
