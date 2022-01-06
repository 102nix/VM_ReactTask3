import React, { useEffect } from 'react'
import { Users } from './layouts/Users'
import { NavBar } from './components/ui/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './hooks/useAuth'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { LogOut } from './layouts/LogOut'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionList } from './store/profession'
import { loadUsersList } from './store/users'

export default function App () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionList())
    dispatch(loadUsersList())
  }, [])
  return (
    <div className="container">
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}