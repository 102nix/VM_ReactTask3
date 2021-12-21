import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'

export const LogOut = () => {
  const { logOut } = useAuth()
  useEffect(() => {
    logOut()
  }, [])
  return (
    <h1>Loading</h1>
  )
}