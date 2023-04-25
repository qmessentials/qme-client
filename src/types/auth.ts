export interface Login {
  userId: string
  password: string
}

export interface User {
  userId: string
  givenNames: string[]
  familyNames: string[]
  emailAddress: string
  roles: string[]
  isActive: boolean
}

export enum AuthState {
  None,
  CheckingToken,
  TokenFailed,
  CheckingCredentials,
  CredentialsFailed,
  LoggedIn,
}
