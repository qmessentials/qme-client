import { ReactNode } from 'react'

export default function TH({ children }: { children: ReactNode }) {
  return <th className="border p-2">{children}</th>
}
