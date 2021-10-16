import React, { useState, useEffect } from 'react'
import { TextField } from '../common/form/TextField'
import { validator } from '../../utils/validator'
import api from '../../api/index'
import { SelectField } from '../common/form/SelectField'
import { RadioField } from '../common/form/RadioField'
import { MultiSelectField } from '../common/form/MultiSelectField'
import { CheckBoxField } from '../common/form/CheckBoxField'

export const RegisterForm  = () => {

  const [data, setData] = useState({
    email: '', 
    password: '', 
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  const [qualities, setQualities] = useState({})

  const [professions, setProfessions] = useState()

  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  }, [])

  const handlerChange = (target) => {
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
    },
    profession: {
      isRequired: {
        message: 'Обязательно выберите вашу профессию'
      }
    },
    licence: {
      isRequired: {
        message: 'Вы не можете использовать наш сервис без лицензионного соглашения'
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
      <SelectField
        label="Выберите свою профессию" 
        defaultOption="Choose..."
        options={professions}
        onChange={handlerChange}
        value={data.profession}
        error={errors.profession}
      />
      <RadioField 
        options={[
          {name: 'Male', value: 'male'}, 
          {name: 'Female', value: 'female'}, 
          {name: 'Other', value: 'other'}
        ]}
        value={data.sex}
        name='sex'
        onChange={handlerChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField 
        options={qualities}
        onChange={handlerChange}
        name="qualities"
        label="Выберете ваши качества"
      />
      <CheckBoxField 
        value={data.licence}
        onChange={handlerChange}
        name='licence'
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a> 
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