import { search } from '@/apis/config/products'
import PageHeader from '@/components/layout/PageHeader'
import TD from '@/components/utility/TD'
import TH from '@/components/utility/TH'
import { withSessionSsr } from '@/lib/withSession'
import { Product } from '@/types/config'
import Link from 'next/link'

export default function Products({ products }: { products: Product[] }) {
  return (
    <>
      <PageHeader>Products</PageHeader>
      <p className="my-4 mx-2">
        <Link href="products/new">Create a Product</Link>
      </p>
      <table className="my-3 mx-2 border-collapse">
        <thead>
          <tr>
            <TH>Product Code</TH>
            <TH>Description</TH>
          </tr>
        </thead>
        <tbody>
          {(products ?? []).map((p) => (
            <tr key={p.productCode}>
              <TD>
                <Link href={`products/${p.productCode}`}>{p.productCode}</Link>
              </TD>
              <TD>{p.description}</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const productsApiResult = await search(req.session.authToken)
  if (productsApiResult === 'Forbidden') {
    throw 'Unexpected forbidden response'
  }
  if (productsApiResult === 'Unauthorized') {
    return {
      redirect: {
        destination: '/api/auth/logout',
        permanent: false,
      },
    }
  }
  const products: Product[] = productsApiResult ?? []
  return {
    props: { products },
  }
})
