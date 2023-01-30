import { ReactNode } from 'react'

export default function PageHeader({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="p-3 text-2xl font-bold">{children}</h1>
      <hr className="mx-2" />
    </>
  )
}
