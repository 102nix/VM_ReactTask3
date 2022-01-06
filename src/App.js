import React, { useEffect } from 'react'
import { Users } from './layouts/Users'
import { NavBar } from './components/ui/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { LogOut } from './layouts/LogOut'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'

export default function App () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  return (
    <div className="container">
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}