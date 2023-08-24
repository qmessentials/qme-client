export function camelCaseLabelText(label: string): string {
  const words = label.split(/\W+/)
  const reformattedWords = []
  let i = 0
  for (let word of words) {
    if (i++ === 0) {
      reformattedWords.push(word.toLowerCase())
    } else if (word.toLowerCase() === 'id') {
      reformattedWords.push('Id')
    } else if (isAllCaps(word)) {
      reformattedWords.push(word)
    } else {
      reformattedWords.push(camelCaseWord(word))
    }
  }
  return reformattedWords.join('')
}

function isAllCaps(word: string): boolean {
  if (word.length <= 1) {
    return false
  }
  return word === word.toUpperCase()
}

function camelCaseWord(word: string): string {
  const chars = []
  let index = 0
  for (let c of word) {
    chars.push(index++ === 0 ? c.toUpperCase() : c)
  }
  return chars.join('')
}

export function queryStringify(obj: any) {
  const params: string[] = []
  for (let propName in obj) {
    const val = obj[propName]
    if (val === null || val === undefined) {
      continue
    }
    if (Array.isArray(val)) {
      for (let item of val) {
        if (item !== null && item !== undefined) {
          params.push(`${propName}=${item}`)
        }
      }
    } else {
      params.push(`${propName}=${val}`)
    }
  }
  return params.join('&')
}
