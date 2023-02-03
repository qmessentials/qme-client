import { useAuth, useAuthDispatch } from '@/context/AuthContext'
import { AuthState } from '@/types/auth'
import { ReactNode, useEffect, useState } from 'react'
import Login from './Login'
import Spinner from '../utility/Spinner'

export default function LoginWrapper({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const authDispatch = useAuthDispatch()
  useEffect(() => {
    if (auth.authState === AuthState.None) {
      authDispatch({ type: 'BEGIN_CHECKING_TOKEN' })
      const token = sessionStorage.getItem('authToken')
      if (!token) {
        authDispatch({ type: 'TOKEN_NOT_FOUND' })
        return
      }
      ;(async () => {
        try {
          const response = await fetch('http://localhost:3000/api/auth/tokens', {
            method: 'POST',
            body: token,
          })
          const user = await response.json()
          authDispatch({ type: 'SUCCEED_CHECKING_TOKEN', user })
        } catch (error) {
          console.error(error)
          authDispatch({ type: 'FAIL_CHECKING_TOKEN' })
        }
      })()
    }
  }, [auth.authState, authDispatch])
  return (
    <>
      {auth.authState === AuthState.None || auth.authState === AuthState.CheckingToken ? (
        <Spinner />
      ) : auth.authState === AuthState.TokenFailed ||
        auth.authState === AuthState.CheckingCredentials ||
        auth.authState === AuthState.CredentialsFailed ? (
        <Login />
      ) : (
        children
      )}
    </>
  )
}
