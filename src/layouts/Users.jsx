import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import { useAuth } from '../hooks/useAuth'
import UsersListPage from '../components/page/usersListPage'
import UserEdit from '../components/page/userEdit'
import UserProvider from '../hooks/useUsers'

export const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const { currentUser } = useAuth()
  // return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <UserEdit />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
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