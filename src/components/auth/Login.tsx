import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Alert from '../layout/Alert'
import Button from '../utility/Button'
import TextInput from '../utility/TextInput'

export default function Login() {
  const [isChecking, setIsChecking] = useState(false)
  const [generalErrorMessage, setGeneralErrorMessage] = useState('')

  // const handleButtonClick = useCallback(() => {
  //   let failedValidation = false
  //   if (!userId) {
  //     setUserIdValidationMessage('Please enter your user ID')
  //     failedValidation = true
  //   }
  //   if (!password) {
  //     setPasswordValidationMessage('Please enter your password')
  //     failedValidation = true
  //   }
  //   if (failedValidation) {
  //     setGeneralErrorMessage('Please correct the errors and try again')
  //     return
  //   }
  // }, [userId, password])

  const {
    query: { status },
  } = useRouter()

  useEffect(() => {
    if (status === 'failed') {
      setGeneralErrorMessage('Login failed')
    }
  }, [status])
  function validate() {
    setIsChecking(true)
  }

  return (
    <>
      <div className="w-full max-w-xs">
        <form
          action="/api/auth/login"
          method="post"
          className="bg-white border border-gray-300 rounded px-6 pt-6 pb-8 mb-4"
          onSubmit={validate}
        >
          <div className="mb-4">
            <TextInput label="User ID" id="userId" name="userId" disabled={isChecking} required={true} />
          </div>
          <div className="mb-6">
            <TextInput label="Password" id="password" name="password" isPassword={true} disabled={isChecking} required={true} />
          </div>
          <div className="flex items-center justify-between">
            <Button category="primary" type="submit" disabled={isChecking}>
              Sign In
            </Button>
          </div>
          {generalErrorMessage ? <Alert category="USER_ERROR">{generalErrorMessage}</Alert> : <></>}
        </form>
      </div>
    </>
  )
}
