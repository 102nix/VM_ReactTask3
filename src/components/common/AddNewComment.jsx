import React, {useState, useEffect} from "react"
import { SelectField } from '../common/form/SelectField'
import { TextAreaField } from '../common/form/TextAreaField'
import * as yup from 'yup'
import api from '../../api/index'

export const AddNewComment = ({ allUsers }) => {
  
  const [data, setData] = useState({ commentUserName: '', content: '' })
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
    commentUserName: yup.string().required('Обязательно выберите пользователя')
  })

  const validate = () => {
    validateScheme.validate(data)
      .then(() => setErrors({}))
      .catch(err => setErrors({[err.path]: err.message}))
    return Object.keys(errors).length === 0
  }
  
  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {

    const calculateUserId = (userName) => {
      let userId = ''
      allUsers.forEach(user => {
        if (user.name === userName) {
          userId = user._id
        }
      })
      return userId
    }

    e.preventDefault()
    const isValid = validate()
    if (!isValid) return

    data.pageId = calculateUserId(data.commentUserName) //(allUsers, userName)

    api.comments.add(data)

    setData({ commentUserName: '', content: '' })
  }
  return (
    <div className="card mb-2">
      <div className="card-body ">
        <div>
          <h2>New comment</h2>
          <form onSubmit={handleSubmit}>
            <SelectField
              // label="Выберите пользователя"
              defaultOption="Выберите пользователя"
              options={allUsers}
              onChange={handlerChange}
              value={data.commentUserName}
              error={errors.commentUserName}
              name="commentUserName"
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
      </div>
    </div>
  )
}
