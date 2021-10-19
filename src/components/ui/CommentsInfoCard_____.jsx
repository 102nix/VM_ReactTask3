import React, { useState, useEffect } from 'react'
import { AddNewComment } from '../common/AddNewComment'
import { CurrentCommentsUser } from '../common/CurrentCommentsUser'
import * as yup from 'yup'
import api from '../../api/index'

export const CommentsInfoCard = ({ allUsers, userId }) => {
  
  const [commentsCurrentUser, setCommentsCurrentUser] = useState([])
  const [data, setData] = useState({ commentUserName: '', content: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.comments.fetchCommentsForUser(userId).then((data) => setCommentsCurrentUser(data))
  }, [])

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
    <>
      <AddNewComment
        allUsers={allUsers}
        handlerChange={handlerChange}
        data={data}
        errors={errors}
        handleSubmit={handleSubmit}
        isValid={isValid}
      />
      {commentsCurrentUser.length > 0 &&
        <CurrentCommentsUser
          comments={commentsCurrentUser}
          allUsers={allUsers}
          deleteComment={deleteComment}
        />
      }
    </>
  )
  
}