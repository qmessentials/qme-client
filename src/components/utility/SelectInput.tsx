import { camelCaseLabelText } from '@/util/functions'
import { useMemo } from 'react'

export interface SelectInputParams {
  label: string
  id?: string
  name?: string
  value?: string
  options: { value: string | number | readonly string[]; text: string }[]
  onChange?: (value: string) => void
  placeholder?: string
  validationMessage?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export default function SelectInput({
  label,
  id,
  name,
  value,
  options,
  onChange,
  placeholder,
  validationMessage,
  disabled = false,
  required = false,
  className = '',
}: SelectInputParams) {
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
      <select
        id={idOrDefault}
        name={name}
        className={`${className} border ${borderColor} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : () => {})}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      >
        <option value=""></option>
        {options.map((opt) => (
          <option key={opt.text} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
      {validationMessage ? <p className="text-red-500 text-sm pt-1">{validationMessage}</p> : <></>}
    </>
  )
}
