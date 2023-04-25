import { camelCaseLabelText } from '@/util/functions'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Badge from './Badge'

interface MultiSelectProps<T> {
  label: string
  id?: string
  name?: string
  placeholder?: string
  options: T[] | undefined
  values: T[]
  onChange: (newValues: T[]) => void
  keySelector?: (value: T) => string
  valueSelector?: (value: T) => string
  validationMessage?: string
}
export default function MultiSelect<T>({
  label,
  id,
  name,
  options,
  values,
  placeholder,
  onChange,
  keySelector,
  valueSelector,
  validationMessage,
}: MultiSelectProps<T>) {
  const idOrDefault = id ?? camelCaseLabelText(label)
  const [borderColor, textColor] = useMemo(
    () => (validationMessage ? ['border-red-500', 'text-red-500'] : ['border-gray-300', 'text-gray-500']),
    [validationMessage]
  )
  const getKey = useMemo((): ((value: T) => string) => keySelector ?? ((value) => `${value}`), [keySelector])

  const getValue = useMemo((): ((value: T) => string) => valueSelector ?? ((value) => `${value}`), [valueSelector])

  const unselectedOptions = useMemo(
    (): T[] => options?.filter((o) => !values?.some((v) => getKey(v) === getKey(o))) ?? [],
    [options, values, getKey]
  )

  const [isListExpanded, setIsListExpanded] = useState(false)
  const [mousedOverOption, setMousedOverOption] = useState('')
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  const collapseOnOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (isListExpanded && event.target && !mainBoxRef.current?.contains(event.target as Node)) {
        setIsListExpanded(false)
      }
    },
    [isListExpanded]
  )

  useEffect((): (() => void) => {
    window.addEventListener('click', collapseOnOutsideClick)
    return () => window.removeEventListener('click', collapseOnOutsideClick)
  }, [collapseOnOutsideClick])

  useEffect(() => {
    if (isListExpanded && unselectedOptions.length === 0) {
      setIsListExpanded(false)
    }
  }, [unselectedOptions, isListExpanded])

  const mainBoxRef = useRef<HTMLDivElement>(null)

  return (
    <div>
      <label className={`block ${textColor} font-bold mb-2`} htmlFor={idOrDefault}>
        {label}
      </label>
      <div className="flex" ref={mainBoxRef}>
        <span
          className="border rounded-l p-2 flex-fill"
          onClick={() => {
            setIsListExpanded(!isListExpanded)
          }}
        >
          {placeholder && values.length === 0 ? <span className="text-muted">{placeholder}</span> : <></>}
          {[...(values ?? [])]
            .sort((a, b) => (a < b ? -1 : 1))
            .map((v) => (
              <Badge
                key={getKey(v)}
                onClick={() => {
                  onChange(values.filter((val) => getKey(val) !== getKey(v)))
                  setIsListExpanded(false)
                }}
              >
                {getValue(v)}
              </Badge>
            ))}
        </span>
        <span
          className={`border rounded-r p-2 text-end ${isButtonHovered && unselectedOptions.length > 0 ? 'bg-gray-400 text-white' : ''}`}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          onClick={() => setIsListExpanded(!isListExpanded)}
        >
          <ChevronDownIcon className="w-4" />
        </span>
        <input type="hidden" id={id} name={name} value={values.join('|')} />
      </div>
      {isListExpanded && unselectedOptions.length > 0 ? (
        <>
          <div
            className="border border-gray-300 rounded bg-white p-2"
            style={{ position: 'absolute', zIndex: 2, width: mainBoxRef.current?.clientWidth }}
          >
            {unselectedOptions.map((o) => (
              <div
                key={getKey(o)}
                className={mousedOverOption === getKey(o) ? 'bg-info' : ''}
                onClick={() => onChange([...values, o])}
                onMouseOver={() => setMousedOverOption(getKey(o))}
                onMouseOut={() => setMousedOverOption('')}
              >
                {getValue(o)}
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
