import React, { useState, useEffect } from 'react'
import { TextField } from '../../common/form/TextField'
import { SelectField } from '../../common/form/SelectField'
import { RadioField } from '../../common/form/RadioField'
import { MultiSelectField } from '../../common/form/MultiSelectField'
import { useParams, useHistory  } from 'react-router-dom'
import { prepareQualities, transformationQualities } from '../../../utils/preparingEditDataForm'
import api from '../../../api/index'
import * as yup from 'yup'


export const UserEdit = () => {

  const { userId } = useParams()
  const history = useHistory()

  const [qualities, setQualities] = useState({})
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})

  const [data, setData] = useState({})

  useEffect(() => {
    api.users.getById(userId).then(data => setData({
      name: data.name,
      email: data.email, 
      profession: data.profession._id,
      sex: data.sex,
      qualities: data.qualities,
    }))
    api.professions.fetchAll().then(data => setProfessions(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  },[])

  console.log('Data: ', data)

  const handlerChange = (target) => {
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  let validateScheme = yup.object().shape({
    profession: yup.string().required('Обязательно выберите вашу профессию'),
    email: yup.string().required('Email обязательно для заполнения').email('Email введён некорректно'),
    name: yup.string().required('Это поле обязательно для заполнения')
  })

  const validate = () => {
    validateScheme.validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({[err.path]: err.message}))
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    validate()
  }, [data])

  ////////////////////////////////////////////////////
  const handleSubmit = (e) => {

    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    //prepare qualities:
    data.qualities = prepareQualities(qualities, data.qualities)
    //prepare professions:
    Object.keys(professions).forEach(profession => {
      if(data.profession === professions[profession]._id) {
        data.profession = {...professions[profession]}
      }
    })
    //

    api.users.update(userId, data)
    history.push(`/users/${userId}`)
    setData({})
  }

  return (
    <>
      <button 
        className="btn btn-primary mb-3 mt-2"
        onClick={()=> {history.push(`/users/${userId}`)}}
      >
        Назад
      </button>
      {professions === undefined ? (
        <div>
          <h2>Loading...</h2>
        </div>
      ) : (
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
            // defaultOption={data.profession}
            options={professions}
            onChange={handlerChange}
            value={data.profession}
            error={errors.profession}
            name='profession'
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
            values={transformationQualities(qualities, data.qualities)}
            onChange={handlerChange}
            name="qualities"
            label="Выберете ваши качества"
          />
          <button 
            type="submit"
            disabled={!isValid}
            className="btn btn-primary w-100 mx-auto "
          >
            Submit
          </button>
        </form>
      )}
     </>
  )
}