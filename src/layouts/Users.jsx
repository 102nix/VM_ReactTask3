import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserEdit from '../components/page/userEdit'

export const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  // return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>
  return (
    <>
      {userId ? (
        edit ? (
          <UserEdit />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
  
}