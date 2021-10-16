import React, { useEffect, useState } from 'react'
import { TextField } from '../common/form/TextField'
// import { validator } from '../../utils/validator'
import { CheckBoxField } from '../common/form/CheckBoxField'
import * as yup from 'yup';

export const LoginForm = () => {
  
  const [data, setData] = useState({
    email: '', password: '', stayOn: false
  })
  
  const [errors, setErrors] = useState({})

  const handlerChange = (target) => {
    console.log(target)
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    // const errors =  validator(data, validatorConfig)
    validateScheme.validate(data).then(() => setErrors({})).catch(err => setErrors({[err.path]: err.message}))
    // setErrors(errors)
    return Object.keys(errors).length === 0 
  }

  const isValid = Object.keys(errors).length === 0
  
  let validateScheme = yup.object().shape({
    password: yup.string().required('Пароль обязателен для заполнения')
    .matches(/(?=.*[A-Z])/,'Пароль должен содержать хотябы 1 заглавную букву')
    .matches(/(?=.*[0-9])/,'Пароль должен содержать хотябы 1 число')
    .matches(/(?=.*[!@#$%^&*])/,'Пароль должен содержать один из специальных символов !@#$%^&*')
    .matches(/(?=.{8,})/,'Пароль должен состоять минимум из 8 символов'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно'),
  }) 

  // const validatorConfig = {
  //   email: {
  //     isRequired: {
  //       message: 'Email обязательно для заполнения'
  //     },
  //     isEmail: {
  //       message: 'Email введён некорректно'
  //     }
  //   },
  //   password: {
  //     isRequired: {
  //       message: 'Пароль обязателен для заполнения'
  //     },
  //     isCapital: {
  //       message: 'Пароль должен содержать хотябы 1 заглавную букву'
  //     },
  //     isContainDigit: {
  //       message: 'Пароль должен содержать хотябы 1 число'
  //     },
  //     min: {
  //       message: 'Пароль должен состоять минимум из 8 символов',
  //       value: 8
  //     }
  //   }
  // }

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
      <CheckBoxField 
        value={data.stayOn}
        onChange={handlerChange}
        name='stayOn'
      >
        Оставаться в системе 
      </CheckBoxField>
      <button 
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto "
      >
        Submit
      </button>
    </form>
  )
}