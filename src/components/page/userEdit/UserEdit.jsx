import React, { useState, useEffect } from 'react'
import { TextField } from '../../common/form/TextField'
import { SelectField } from '../../common/form/SelectField'
import { RadioField } from '../../common/form/RadioField'
import { MultiSelectField } from '../../common/form/MultiSelectField'
import { useParams, useHistory  } from 'react-router-dom'
import { prepareQualities, transformationQualities, getProfessionById } from '../../../utils/preparingEditDataForm'
import api from '../../../api/index'
import * as yup from 'yup'
import { BackHistoryButton } from '../../common/form/BackButton'


export const UserEdit = () => {

  const { userId } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: []
  })
  const [professions, setProfessions] = useState([])
  const [qualities, setQualities] = useState({})
  const [errors, setErrors] = useState({})
  
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

    const { profession, qualities } = data
    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(professions, profession),
        qualities: prepareQualities(qualities, data.qualities)
      })
      .then(data => history.push(`/users/${data._id}`))
  }

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(userId).then(({ profession, ...data }) => 
      setData(prevState => ({
        ...prevState,
        ...data,
        profession: profession._id
      }))
  )
    api.qualities.fetchAll().then(data => setQualities(data)) 
    api.professions.fetchAll().then(data => setProfessions(data))
  },[])
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
            // defaultValue={data.qualities}
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
      ) : (
        "Loading..."
      )}
      </div>
      </div>
     </div>
  )
}