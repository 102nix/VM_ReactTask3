import React from 'react'
import { Users } from './layouts/Users'
import { NavBar } from './components/ui/NavBar'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { NotFound } from "./components/NotFound";
import UserEdit from './components/page/userEdit'

export default function App() {

  return (
    <div className="container">
      <NavBar />
      <Switch>
        <Route path='/users/:userId?/:edit?' component={Users}/>
        <Route path='/login/:type?' component={Login}/>
        <Route exact path='/' component={Main}/>
        <Redirect to='/' />
      </Switch>
    </div>
  )
}
