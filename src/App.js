import React from 'react'
import { Users } from './layouts/Users'
import { NavBar } from './components/ui/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
import { ProtectedRoute } from './components/common/ProtectedRoute'
import { LogOut } from './layouts/LogOut'

export default function App () {
  return (
    <div className="container">
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route exact path="/" component={Main} />
              <Redirect to="/" />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  )
}