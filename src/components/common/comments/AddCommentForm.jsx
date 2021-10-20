import React, {useState, useEffect} from "react"
import { SelectField } from '../form/SelectField'
import { TextAreaField } from '../form/TextAreaField'
import * as yup from 'yup'
import api from '../../../api/index'
const initialData = {userId: '', content: ''}

export const AddCommentForm = ({ onSubmit }) => {
  
  const [data, setData] = useState(initialData)
  const [users, setUsers] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    validate()
  }, [data])

  const handlerChange = (target) => {
    console.log(target)
    setData(prevSate => ({
      ...prevSate,
      [target.name]: target.value
    }))
  }

  let validateScheme = yup.object().shape({
    content: yup.string().required('Необходимо заполнить комментарий'),
    userId: yup.string().required('Обязательно выберите пользователя')
  })

  const validate = () => {
    validateScheme.validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({[err.path]: err.message}))
    return Object.keys(errors).length === 0
  }
  
  const isValid = Object.keys(errors).length === 0

  useEffect(() => {
    api.users.fetchAll().then(setUsers)
  }, [])

  const clearForm = () => {
    setData(initialData)
    setErrors({})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    onSubmit(data)
    clearForm()
  }

  const arrayOfUsers = users && Object.keys(users).map(userId => ({
    name: users[userId].name,
    value: users[userId]._id
  }))

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          defaultOption="Выберите пользователя"
          options={arrayOfUsers}
          onChange={handlerChange}
          value={data.userId}
          error={errors.userId}
          name="userId"
        />
        <TextAreaField
          label="Сообщение"
          name="content"
          value={data.content}
          onChange={handlerChange}
          error={errors.content}
        />
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!isValid}
        >
          Опубликовать
        </button>
      </form>
    </div>

  )
}
