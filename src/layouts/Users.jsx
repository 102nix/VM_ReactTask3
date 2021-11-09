import React from 'react'
import { useParams } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserEdit from '../components/page/userEdit'
import UserProvider from '../hooks/useUsers'

export const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  // return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            <UserEdit />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </>
  )
}