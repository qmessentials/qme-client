import { ReactNode, useMemo } from 'react'

export interface AlertProps {
  category: 'INFO' | 'SUCCESS' | 'WARNING' | 'USER_ERROR' | 'APPLICATION_ERROR'
  children: ReactNode
}

export default function Alert({ category, children }: AlertProps) {
  const classes = useMemo(
    () =>
      category === 'INFO'
        ? 'bg-blue-100 border-blue-600 text-blue-600'
        : category === 'SUCCESS'
        ? 'bg-green-100 border-green-600 text-green-600'
        : category === 'WARNING'
        ? 'bg-yellow-100 border-yellow-600 text-yellow-600'
        : category === 'APPLICATION_ERROR' || category === 'USER_ERROR'
        ? 'bg-red-100 border-red-600 text-red-600'
        : 'bg-gray-100 border-gray-600 text-gray-600',
    [category]
  )
  return <div className={`px-3 py-2 my-4 rounded border-2 font-bold ${classes}`}>{children}</div>
}
