import React, { useEffect } from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import UserEdit from '../components/page/userEdit'
import UserProvider from '../hooks/useUsers'
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentUserId, getDataStatus, loadUsersList } from '../store/users'

export const Users = () => {
  const params = useParams()
  const { userId, edit } = params
  const currentUserId = useSelector(getCurrentUserId())
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])
  if (!dataStatus) return 'Loading...'
  return (
    <>
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUserId ? (
              <UserEdit />
            ) : (
              <Redirect to={`/users/${currentUserId}/edit`} />
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