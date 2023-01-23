export interface User {
  name: string
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
