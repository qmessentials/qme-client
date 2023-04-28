import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  onClick: () => void
}

export default function Badge({ onClick, children }: BadgeProps) {
  return (
    <span className="bg-gray-200 text-black rounded-md p-1 m-1">
      <span>{children}</span>
      <button className="px-1" onClick={onClick}>
        &times;
      </button>
    </span>
  )
}
