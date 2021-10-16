import React from 'react'
import { Users } from './layouts/Users'
import { NavBar } from './components/ui/NavBar'
import { Redirect, Route } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { NotFound } from "./components/NotFound";
import UserEdit from './components/page/userEdit'

export default function App() {

  return (
    <div className="container">
      <NavBar />
      <Route exact path='/' component={Main}/>
      <Route path='/login/:type?' component={Login}/>
      <Route exact path='/users/:userId?' component={Users}/>
      <Route path='/users/:userId?/edit' component={UserEdit}/>
      <Route path='/404' component={NotFound} />
    </div>
  )
}
