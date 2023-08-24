import { User, AuthState } from '@/types/auth'
import { createContext, useReducer, useState, ReactNode, useContext, Dispatch } from 'react'

export interface AuthContextInfo {
  user: User | undefined
  authState: AuthState
}

export interface AuthContextAction {
  type:
    | 'BEGIN_CHECKING_TOKEN'
    | 'TOKEN_NOT_FOUND'
    | 'FAIL_CHECKING_TOKEN'
    | 'SUCCEED_CHECKING_TOKEN'
    | 'BEGIN_CHECKING_CREDENTIALS'
    | 'SUCCEED_CHECKING_CREDENTIALS'
    | 'FAIL_CHECKING_CREDENTIALS'
    | 'LOGOUT'
  user?: User | undefined
  authState?: AuthState
}

const defaultAuthContextInfo: AuthContextInfo = {
  user: undefined,
  authState: AuthState.None,
}

const defaultAuthContextDispatch: Dispatch<AuthContextAction> = (action: AuthContextAction) => {}

function authReducer(prevState: AuthContextInfo, action: AuthContextAction): AuthContextInfo {
  console.info(action)
  switch (action.type) {
    case 'BEGIN_CHECKING_TOKEN': {
      return { ...prevState, user: undefined, authState: AuthState.CheckingToken }
    }
    case 'TOKEN_NOT_FOUND': {
      return { ...prevState, user: undefined, authState: AuthState.TokenFailed }
    }
    case 'FAIL_CHECKING_TOKEN': {
      return { ...prevState, user: undefined, authState: AuthState.TokenFailed }
    }
    case 'SUCCEED_CHECKING_TOKEN': {
      return {
        ...prevState,
        user: action.user,
        authState: AuthState.LoggedIn,
      }
    }
    default:
      return { ...prevState }
  }
}

const AuthContext = createContext<AuthContextInfo>(defaultAuthContextInfo)
const AuthDispatchContext = createContext<Dispatch<AuthContextAction>>(defaultAuthContextDispatch)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [info, dispatch] = useReducer(authReducer, defaultAuthContextInfo)
  return (
    <AuthContext.Provider value={info}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export const useAuthDispatch = () => useContext(AuthDispatchContext)
