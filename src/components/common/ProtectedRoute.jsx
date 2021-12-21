import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth()
  return (
    <Route {...rest} render={(props) => {
      if (!currentUser) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      }
      return Component ? <Component {...props} /> : children
    }}/>
  )
}