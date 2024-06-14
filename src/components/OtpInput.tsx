import { useEffect, useRef, useState } from 'react'

import styles from './OtpInput.module.css'

type OtpInputProps = {
  length: number
  onOtpSubmit: (otp: string) => void
}

const OtpInput = ({ length, onOtpSubmit }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''))
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const [combinedOtp, setCombinedOtp] = useState('')
  const [isFullFilled, setIsFullFilled] = useState(false)

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus()
    }
  }, [])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value
    const regex = /^\d*$/
    if (!regex.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    const combinedOtp = newOtp.join('')

    if (combinedOtp.length === length) {
      setCombinedOtp(combinedOtp)
      setIsFullFilled(true)
    } else {
      setIsFullFilled(false)
    }

    if (value && index < length - 1 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleClick = (index: number) => {
    inputsRef.current[index]?.setSelectionRange(1, 1)

    // optional feature
    /*
    if (index > 0 && !otp[index - 1]) {
      inputsRef.current[otp.indexOf('')]?.focus()
    }

    if (index < length - 1 && !otp[index + 1]) {
      inputsRef.current[otp.indexOf('')]?.focus()
    }
    */
  }

  const handleSubmit = () => {
    onOtpSubmit(combinedOtp)

    setCombinedOtp('')
    const newOtp = [...otp]
    const cleanedOtp = newOtp.map(() => '')
    setOtp(cleanedOtp)
    setIsFullFilled(false)
  }

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (
      event.key === 'Backspace' &&
      !otp[index] &&
      index > 0 &&
      inputsRef.current[index - 1]
    ) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  return (
    <div className={styles.otp}>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={input => (inputsRef.current[index] = input)}
            value={value}
            onChange={event => handleChange(event, index)}
            onClick={() => handleClick(index)}
            onKeyDown={event => handleKeyDown(event, index)}
            className={styles.otpInput}
          />
        )
      })}
      <button
        disabled={!isFullFilled}
        type="submit"
        className={styles.otpButton}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
}

export default OtpInput
