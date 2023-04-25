import { ReactNode, useMemo } from 'react'

export interface ButtonParams {
  category?: 'primary' | 'success' | 'danger' | 'default'
  children: ReactNode
  type?: 'submit' | 'button'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export default function Button({ category, children, onClick, type = 'submit', disabled = false, className = '' }: ButtonParams) {
  const { background, border, text, hoverBackground, hoverBorder, hoverText, disabledBackground, disabledBorder, disabledText } =
    useMemo(() => {
      switch (category) {
        case 'primary': {
          return {
            background: 'bg-blue-600',
            border: 'border-blue-600',
            text: 'text-white',
            hoverBackground: 'hover:bg-blue-500',
            hoverBorder: 'hover:border-blue-500',
            hoverText: 'hover:text-white',
            disabledBackground: 'disabled:bg-blue-500',
            disabledBorder: 'disabled:border-blue-500',
            disabledText: 'disabled:text-white',
          }
        }
        case 'success': {
          return {
            background: 'bg-green-600',
            border: 'border-green-600',
            text: 'text-white',
            hoverBackground: 'hover:bg-green-500',
            hoverBorder: 'hover:border-green-500',
            hoverText: 'hover:text-white',
            disabledBackground: 'disabled:bg-green-500',
            disabledBorder: 'disabled:border-green-500',
            disabledText: 'disabled:text-white',
          }
        }
        case 'danger': {
          return {
            background: 'bg-red-500',
            border: 'border-red-500',
            text: 'text-white',
            hoverBackground: 'hover:bg-red-400',
            hoverBorder: 'hover:border-red-400',
            hoverText: 'hover:text-white',
            disabledBackground: 'disabled:bg-red-500',
            disabledBorder: 'disabled:border-red-500',
            disabledText: 'disabled:text-white',
          }
        }
        default: {
          return {
            background: 'bg-white',
            border: 'border-gray-700',
            text: 'text-gray-700',
            hoverBackground: 'hover:bg-gray-700',
            hoverBorder: 'hover:border-gray-700',
            hoverText: 'hover:text-white',
            disabledBackground: 'disabled:bg-gray-500',
            disabledBorder: 'disabled:border-gray-500',
            disabledText: 'disabled:text-white',
          }
        }
      }
    }, [category])
  return (
    <button
      className={`${className} border ${background} ${border} ${text} ${hoverBackground} ${hoverBorder} ${hoverText} ${disabledBackground} ${disabledBorder} ${disabledText} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
