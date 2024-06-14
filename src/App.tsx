import styles from './App.module.css'
import PhoneOtpForm from './components/PhoneOtpForm'

function App() {
  return (
    <div className={styles.app}>
      <h1>Login with phone</h1>
      <PhoneOtpForm />
    </div>
  )
}

export default App
