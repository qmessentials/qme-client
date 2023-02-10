import Router, { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Alert from '../../components/layout/Alert'
import Button from '../../components/utility/Button'
import TextInput from '../../components/utility/TextInput'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [generalErrorMessage, setGeneralErrorMessage] = useState('')

  const {
    query: { status },
  } = useRouter()

  useEffect(() => {
    if (status === 'failed') {
      setGeneralErrorMessage('Login failed')
    } else if (status === 'error') {
      setGeneralErrorMessage('Error in login process')
    } else {
      setGeneralErrorMessage('')
    }
  }, [status])

  async function submit() {
    setIsChecking(true)
    try {
      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: 'post',
        body: JSON.stringify({ userId, password }),
      })
      if (loginResponse.status === 201) {
        Router.push('/')
      } else {
        console.warn(`Login of user ID '${userId}' returned status ${loginResponse.status}`)
        setIsChecking(false)
        setGeneralErrorMessage('Login failed')
      }
    } catch (error) {
      console.error(error)
      setIsChecking(false)
      setGeneralErrorMessage('Error processing login')
    }
  }

  return (
    <>
      <div className="w-full max-w-xs">
        <form action="/api/auth/login" method="post" className="bg-white border border-gray-300 rounded px-6 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <TextInput
              label="User ID"
              id="userId"
              name="userId"
              value={userId}
              onChange={setUserId}
              disabled={isChecking}
              required={true}
            />
          </div>
          <div className="mb-6">
            <TextInput
              label="Password"
              id="password"
              name="password"
              value={password}
              onChange={setPassword}
              isPassword={true}
              disabled={isChecking}
              required={true}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button category="primary" type="button" disabled={isChecking} onClick={submit}>
              Sign In
            </Button>
          </div>
          {generalErrorMessage ? <Alert category="USER_ERROR">{generalErrorMessage}</Alert> : <></>}
        </form>
      </div>
    </>
  )
}
