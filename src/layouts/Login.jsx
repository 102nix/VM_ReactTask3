import React, { useState, useEffect } from 'react'
import { TextField } from '../components/TextField'
import { validator } from '../utils/validator'

export const Login = () => {

  const [data, setData] = useState({
    email: '', password: ''
  })
  const [errors, setErrors] = useState({})

  const handlerChange = ({ target }) => {
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors =  validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0 
  }

  const isValid = Object.keys(errors).length === 0 

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Email обязательно для заполнения'
      },
      isEmail: {
        message: 'Email введён некорректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapital: {
        message: 'Пароль должен содержать хотябы 1 заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотябы 1 число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  }

  useEffect (() => {
    validate()
  }, [data])

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    console.log(data)
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField 
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handlerChange}
              error={errors.email}
            />
            <TextField 
              label="Пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handlerChange}
              error={errors.password}
            />
            <button 
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto "
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 