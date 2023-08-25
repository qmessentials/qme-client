import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode, useMemo } from 'react'

export default function PageHeader({ children }: { children: ReactNode }) {
  const router = useRouter()
  const title = useMemo(() => `QMEssentials${router.asPath === '/' ? '' : ` - ${children}`}`, [children, router.asPath])
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="p-3 text-2xl font-bold">{children}</h1>
      <hr className="mx-2" />
    </>
  )
}
