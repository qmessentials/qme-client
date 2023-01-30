import { useCallback, useEffect, useState } from 'react'
import Alert from '../layout/Alert'
import Button from '../utility/Button'
import TextInput from '../utility/TextInput'

export default function Login() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [userIdValidationMessage, setUserIdValidationMessage] = useState('')
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('')
  const [generalErrorMessage, setGeneralErrorMessage] = useState('')

  useEffect(() => {
    setUserIdValidationMessage('')
    setPasswordValidationMessage('')
    setGeneralErrorMessage('')
  }, [userId, password])

  const handleButtonClick = useCallback(() => {
    let failedValidation = false
    if (!userId) {
      setUserIdValidationMessage('Please enter your user ID')
      failedValidation = true
    }
    if (!password) {
      setPasswordValidationMessage('Please enter your password')
      failedValidation = true
    }
    if (failedValidation) {
      setGeneralErrorMessage('Please correct the errors and try again')
      return
    }
  }, [userId, password])

  return (
    <>
      <div className="w-full max-w-xs">
        <form className="bg-white border border-gray-300 rounded px-6 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <TextInput
              label="User ID"
              value={userId}
              onChange={setUserId}
              disabled={isChecking}
              validationMessage={userIdValidationMessage}
            />
          </div>
          <div className="mb-6">
            <TextInput
              label="Password"
              value={password}
              onChange={setPassword}
              isPassword={true}
              disabled={isChecking}
              validationMessage={passwordValidationMessage}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button category="primary" type="button" disabled={isChecking} onClick={handleButtonClick}>
              Sign In
            </Button>
          </div>
          {generalErrorMessage ? <Alert category="USER_ERROR">{generalErrorMessage}</Alert> : <></>}
        </form>
      </div>
    </>
  )
}
