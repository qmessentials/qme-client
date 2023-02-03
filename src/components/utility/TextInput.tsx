import { camelCaseLabelText } from '@/util/functions'
import { useMemo } from 'react'

export interface InputParams {
  label: string
  id?: string
  name?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  isPassword?: boolean
  validationMessage?: string
  disabled?: boolean
  required?: boolean
}

export default function TextInput({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  isPassword,
  validationMessage,
  disabled = false,
  required = false,
}: InputParams) {
  const idOrDefault = id ?? camelCaseLabelText(label)
  const [borderColor, textColor] = useMemo(
    () => (validationMessage ? ['border-red-500', 'text-red-500'] : ['border-gray-300', 'text-gray-500']),
    [validationMessage]
  )
  return (
    <>
      <label className={`block ${textColor} font-bold mb-2`} htmlFor={idOrDefault}>
        {label}
      </label>
      <input
        id={idOrDefault}
        name={name}
        type={isPassword ? 'password' : 'text'}
        className={`border ${borderColor} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      />
      {validationMessage ? <p className="text-red-500 text-sm pt-1">{validationMessage}</p> : <></>}
    </>
  )
}
