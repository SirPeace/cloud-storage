import React from "react"
import axios from "axios"

import styles from "./styles.module.css"

const Login = () => {
  const [error, setError] = React.useState(null)
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  })

  const handleInput = (field, value) => {
    if (!["email", "password"].includes(field)) return

    setForm(form => ({
      ...form,
      [field]: value,
    }))
  }

  const handleSubmit = async evt => {
    evt.preventDefault()

    axios
      .post("/api/auth/register", form)
      .then(() => router.push("/"))
      .catch(e => {
        if (e.response?.data) setError(e.response.data?.message)
        else console.error(e)
      })
  }

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <h1>Register</h1>

        <div className={styles.card}>
          <form onSubmit={handleSubmit}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.inputContainer}>
              <div className={styles.inputField}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onInput={evt => handleInput("email", evt.target.value)}
                />
              </div>
              <div className={styles.inputField}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={form.password}
                  onInput={evt => handleInput("password", evt.target.value)}
                />
              </div>
            </div>

            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
