import React, { useState } from 'react'
import { Users } from './components/Users'
import api from './api'

export default function App() {

  const [users, setUsers] = useState(api.users.fetchAll())

  const handlerDelete = (userId) => {
    const newUser = users.filter(user => user._id !== userId)
    setUsers(newUser)
  }

  const handlerStatusBookmark = (userId) => {
    const newUsers = users.map(user => {
      if (user._id === userId) {
        user.status = !user.status
      }
      return user
    })
    setUsers(newUsers)
  }

  return (
    <div className="container">
      <Users 
        users={users}
        onDelete={handlerDelete}  
        onStatus={handlerStatusBookmark}
      />    
    </div>
  )
}
