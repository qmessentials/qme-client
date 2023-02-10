export interface Login {
  userId: string
  password: string
}

export interface User {
  userId: string
  givenNames: string[]
  familyNames: string[]
  roles: string[]
}

export enum AuthState {
  None,
  CheckingToken,
  TokenFailed,
  CheckingCredentials,
  CredentialsFailed,
  LoggedIn,
}
