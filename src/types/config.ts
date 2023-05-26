export interface Product {
  productCode: string
  description: string
}

export interface Test {
  testName: string
  unitType: string
  references: string[]
  standards: string[]
  availableModifiers: string[]
}

export interface Unit {
  fullName: string
  fullNamePlural: string
  abbreviation: string
  measurementSystem: string
  unitType: string
}
