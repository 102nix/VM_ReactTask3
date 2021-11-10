import React from 'react'
import { Users } from './layouts/Users'
import { NavBar } from './components/ui/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'

export default function App () {
  return (
    <div className="container">
      <NavBar />
      <Switch>
        <ProfessionProvider>
          <QualitiesProvider>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </QualitiesProvider>
        </ProfessionProvider>
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </div>
  )
}