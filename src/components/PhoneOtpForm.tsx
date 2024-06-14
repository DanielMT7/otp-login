import { useState } from 'react'
import OtpInput from './OtpInput'

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value)
  }

  const handlePhoneSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // phone validations
    const regex = /[^0-9]/g
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert('Invalid Phone Number')
      return
    }

    // call backend API
    // Show OTP field
    setShowOtpInput(true)
  }

  const onOtpSubmit = (otp: string) => {
    console.log('Login succesful', otp)
  }

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter phone number"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  )
}

export default PhoneOtpForm