import React, { useState, useEffect } from 'react'
import { TextField } from '../../common/form/TextField'
import { SelectField } from '../../common/form/SelectField'
import { RadioField } from '../../common/form/RadioField'
import { MultiSelectField } from '../../common/form/MultiSelectField'
// import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { BackHistoryButton } from '../../common/form/BackButton'
import { useQualities } from '../../../hooks/useQualities'
import { useProfessions } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

export const UserEdit = () => {
  // const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const { qualities } = useQualities()
  const qualitiesList = qualities.map(q => ({ label: q.name, value: q._id }))
  const { professions } = useProfessions()
  const professionsList = professions.map(p => ({ label: p.name, value: p._id }))
  const [errors, setErrors] = useState({})
  const { currentUser, updateUser } = useAuth()
  const [data, setData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    profession: currentUser.profession,
    sex: currentUser.sex,
    qualities: compareQualities()
  })
  console.log(currentUser, qualities)
  const handlerChange = (target) => {
    setData((prevSate) => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  function compareQualities () {
    const resQualities = []
    for (let i = 0; i < qualities.length; i++) {
      const temp = qualities[i]
      for (let j = 0; j < currentUser.qualities.length; j++) {
        if (temp._id === currentUser.qualities[j]) {
          resQualities.push(qualities[i])
        }
      }
    }
    return resQualities.map(q => ({ label: q.name, value: q._id }))
  }

  const validateScheme = yup.object().shape({
    profession: yup.string().required('Обязательно выберите вашу профессию'),
    email: yup
      .string()
      .required('Email обязательно для заполнения')
      .email('Email введён некорректно'),
    name: yup.string().required('Это поле обязательно для заполнения')
  })

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    validate()
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    try {
      await updateUser({
        ...currentUser,
        email: data.email,
        name: data.name,
        profession: data.profession,
        sex: data.sex,
        qualities: data.qualities.map(q => q.value)
      })
    } catch (error) {
      setErrors(error)
    }
  }
  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

  return (
    <div className="container mt-5">
      <BackHistoryButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professions).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handlerChange}
                error={errors.name}
              />
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handlerChange}
                error={errors.email}
              />
              <SelectField
                label="Выберите свою профессию"
                defaultOption="Choose..."
                name="profession"
                options={professionsList}
                onChange={handlerChange}
                value={data.profession}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: 'Male', value: 'male' },
                  { name: 'Female', value: 'female' },
                  { name: 'Other', value: 'other' }
                ]}
                value={data.sex}
                name="sex"
                onChange={handlerChange}
                label="Выберите ваш пол"
              />
              <MultiSelectField
                options={qualitiesList}
                onChange={handlerChange}
                name="qualities"
                label="Выберете ваши качества"
                values={data.qualities}
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto "
              >
                Submit
              </button>
            </form>
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}