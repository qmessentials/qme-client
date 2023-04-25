export interface CreateUserRequest {
  userId: string
  givenNames: string[]
  familyNames: string[]
  emailAddress: string
  roles: string[]
  initialPassword: string
}

export interface UserSearchCriteria {
  roles: string[]
  activeOnly: boolean
}
