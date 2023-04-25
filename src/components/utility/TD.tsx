import { ReactNode } from 'react'

export default function TD({ children }: { children: ReactNode }) {
  return <td className="border p-2">{children}</td>
}
