import { camelCaseLabelText } from '@/util/functions'
import { useMemo } from 'react'

export interface InputParams {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isPassword?: boolean
  validationMessage?: string
  disabled?: boolean
}

export default function TextInput({ label, value, onChange, placeholder, isPassword, validationMessage, disabled = false }: InputParams) {
  const id = camelCaseLabelText(label)
  const [borderColor, textColor] = useMemo(
    () => (validationMessage ? ['border-red-500', 'text-red-500'] : ['border-gray-300', 'text-gray-500']),
    [validationMessage]
  )
  return (
    <>
      <label className={`block ${textColor} font-bold mb-2`} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={isPassword ? 'password' : 'text'}
        className={`border ${borderColor} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
      />
      {validationMessage ? <p className="text-red-500 text-sm pt-1">{validationMessage}</p> : <></>}
    </>
  )
}
