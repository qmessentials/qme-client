import { camelCaseLabelText } from '@/util/functions'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

export interface ArrayInputParams {
  label: string
  id?: string
  name?: string
  value: string[]
  onChange: (value: string[]) => void
  delimiters?: string[]
  placeholder?: string
  validationMessage?: string
  disabled?: boolean
  required?: boolean
  className?: string
}

export default function ArrayInput({
  label,
  id,
  name,
  value,
  onChange,
  delimiters = ['\n'],
  placeholder,
  validationMessage,
  disabled = false,
  required = false,
  className = '',
}: ArrayInputParams) {
  const idOrDefault = id ?? camelCaseLabelText(label)
  const [borderColor, textColor] = useMemo(
    () => (validationMessage ? ['border-red-500', 'text-red-500'] : ['border-gray-300', 'text-gray-500']),
    [validationMessage]
  )

  const [localValue, setLocalValue] = useState(value.join(delimiters[0]))

  const handleBlur = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(splitOnAnyDelimiter(event.target.value, delimiters))
    },
    [onChange, delimiters]
  )

  function splitOnAnyDelimiter(input: string, delimiters: string[]) {
    const results: string[] = []
    const buffer: string[] = []
    for (let letter of input) {
      let isDelimiter = false
      for (let delimiter of delimiters) {
        if (letter === delimiter) {
          isDelimiter = true
          break
        }
      }
      if (isDelimiter) {
        let word = buffer.join('')
        if (word.length > 0) {
          results.push(word)
        }
        buffer.splice(0)
      } else {
        buffer.push(letter)
      }
    }
    let lastWord = buffer.join('')
    if (lastWord.length > 0) {
      results.push(lastWord)
    }
    return results
  }

  return (
    <>
      <label className={`block ${textColor} font-bold mb-2`} htmlFor={idOrDefault}>
        {label}
      </label>
      <textarea
        id={idOrDefault}
        name={name}
        className={`${className} border ${borderColor} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
      ></textarea>
      {validationMessage ? <p className="text-red-500 text-sm pt-1">{validationMessage}</p> : <></>}
    </>
  )
}
