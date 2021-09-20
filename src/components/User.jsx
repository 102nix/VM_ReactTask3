import React, { useEffect, useState } from 'react'
import api from '../api'
import { Qualities } from './Qualities'
import { useHistory } from 'react-router-dom'


export const User = ({ id }) => {

  const history = useHistory()
  const [user, setUser] = useState()

  useEffect(() => {
    api.users.getById(id).then(data => setUser(data))
  },[])
  return (
    <>
      {user ? (
        <>
          <h2>{user.name}</h2>
          <h2>Профессия: {user.profession.name}</h2>
          {user.qualities &&
            <Qualities qualities={user.qualities} />
          }
          <div>completedMeetings: {user.completedMeetings}</div>
          <h2>Rate: {user.rate}</h2>
          <button 
            className='btn btn-secondary'
            onClick={() => history.push('/users')}
          >
            Все пользователи
          </button>
        </>
      ) : (
        <h2>Loading...</h2>
      )
      }
    </>
  )
}