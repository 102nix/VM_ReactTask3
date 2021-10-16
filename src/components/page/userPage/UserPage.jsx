import React, { useEffect, useState } from 'react'
import api from '../../../api/index'
import { Qualities } from '../../ui/qualities/Qualities'
import { useHistory } from 'react-router-dom'
import { transformationQualities } from '../../../utils/preparingEditDataForm'


export const UserPage = ({ userId }) => {

  const history = useHistory()

  console.log('UserPage userID: ', userId)

  const [user, setUser] = useState()
  const [qualities, setQualities] = useState({})


  useEffect(() => {
    api.users.getById(userId).then(data => setUser(data))
    api.qualities.fetchAll().then(data => setQualities(data))
  },[])


  const handleValuesForModify = () => {
    console.log('UUUUSSSEEERRR: ', user)
    history.push({
      pathname: `/users/${userId}/edit`,
      userInfo: {
        name: user.name, 
        email: user.email ? user.email : '',
        currentProfession: user.profession._id,
        // qualities: user.qualities,
        qualities: transformationQualities (qualities, user.qualities),
        sex: user.sex
      },    
    })
    
  }
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
            onClick={handleValuesForModify}
          >
            Изменить
          </button>
        </>
      ) : (
        <h2>Loading...</h2>
      )
      }
    </>
  )
}