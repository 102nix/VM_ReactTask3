import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/userService'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create()
const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}
const AuthProvider = ({ children }) => {
  const [currentUser, setUser] = useState({})
  const [error, setError] = useState(null)
  async function signUp ({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KET}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
      await createUser({ _id: data.localId, email, ...rest })
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObject = {
            email: 'пользователь с таким Email уже существует'
          }
          throw errorObject
        }
      }
    }
  }
  async function signIn ({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KET}`
    try {
      const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true })
      setTokens(data)
      console.log(data)
    } catch (error) {
      errorCatcher(error)
      console.log(error.response.data.error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'INVALID_PASSWORD') {
          const errorObject = {
            email: 'Неверный Email или пароль'
          }
          throw errorObject
        }
      }
    }
  }
  async function createUser (data) {
    try {
      const { content } = await userService.create(data)
      setUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher (error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])
  return (
    <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
      { children }
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default AuthProvider