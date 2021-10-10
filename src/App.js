import React from 'react'
import { NavBar } from './components/NavBar'
import { Users } from './components/Users'
import { Redirect, Route } from 'react-router-dom'
import { Login } from './layouts/Login'
import { Main } from './layouts/Main'
import { NotFound } from "./components/NotFound";

export default function App() {

  return (
    <div className="container">
      <NavBar />
      <Route exact path='/' component={Main}/>
      <Route path='/login' component={Login}/>
      <Route path='/users/:userId?' component={Users}/>
      <Route path='/404' component={NotFound} />
    </div>
  )
}
