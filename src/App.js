import React, { useState } from 'react'
import { Users } from './components/Users'
import api from './api'

export default function App() {

  const [users, setUsers] = useState(api.users.fetchAll())

  const handlerDelete = (userId) => {
    const newUser = users.filter(user => user._id !== userId)
    setUsers(newUser)
  }

  return (
    <div className="container">
      <Users 
        users={users}
        onDelete={handlerDelete}  
      />    
    </div>
  )
}
