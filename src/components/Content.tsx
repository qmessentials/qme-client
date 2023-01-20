import { ReactNode } from 'react'

export default function Content({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="p-3">{children}</div>
    </>
  )
}
