import React, { useState, useEffect } from 'react'
import { TextField } from '../../common/form/TextField'
import { SelectField } from '../../common/form/SelectField'
import { RadioField } from '../../common/form/RadioField'
import { MultiSelectField } from '../../common/form/MultiSelectField'
import { useParams, useHistory } from 'react-router-dom'
import { prepareQualities } from '../../../utils/preparingEditDataForm'
import api from '../../../api/index'
import * as yup from 'yup';

export const UserEdit = (props) => {

  const { userId } = useParams()
  const { userInfo } = props.location
  const history = useHistory()

  const [qualities, setQualities] = useState({})
  const [professions, setProfessions] = useState()
  const [errors, setErrors] = useState({})
  
  console.log('userInfo: ', userInfo)

  if (userInfo === undefined) history.push(`/users/${userId}`) 

  // const [user, setUser] = useState()

  useEffect(() => {
    // api.users.getById(userId).then(data => setUser(data))
    api.professions.fetchAll().then(data => setProfessions(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  },[])

  const [data, setData] = useState({
    name: userInfo === undefined ? '' : userInfo.name,
    email: userInfo === undefined ? '' : userInfo.email, 
    profession: userInfo === undefined ? '' : userInfo.currentProfession,
    sex: userInfo === undefined ? '' : userInfo.sex,
    qualities: userInfo === undefined ? '' : userInfo.qualities,
  })

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

    console.log('Event: ', e)

    console.log('Start data: ', data)

    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    //prepare qualities:
    data.qualities = prepareQualities(qualities, data.qualities)
    // const tempQualities = []
    // Object.keys(qualities).forEach(optionName => {
    //   data.qualities.forEach(dat => {
    //     if (data.qualities.length > 0) {
    //       if (qualities[optionName].name === dat.label) {
    //         tempQualities.push(qualities[optionName])
    //       }
    //     } 
    //   })
    // })
    // data.qualities = [...tempQualities] 

    //prepare professions:
    Object.keys(professions).forEach(profession => {
      if(data.profession === professions[profession]._id) {
        data.profession = professions[profession]
      }
    })
    //
    
    console.log('End data: ', data)

    api.users.update(userId, data)
    history.push(`/users/${userId}`)
  }

  return (
    <>
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
            values={data.qualities}
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