import { search } from '@/apis/config/products'
import PageHeader from '@/components/layout/PageHeader'
import TD from '@/components/utility/TD'
import TH from '@/components/utility/TH'
import { withSessionSsr } from '@/lib/withSession'
import { Product } from '@/types/config'

export default function Products({ products }: { products: Product[] }) {
  return (
    <>
      <PageHeader>Products</PageHeader>

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
              <TD>{p.productCode}</TD>
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
        destination: '/',
        permanent: false,
      },
    }
  }
  const products: Product[] = productsApiResult ?? []
  return {
    props: { products },
  }
})
