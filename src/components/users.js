import React, {useState} from 'react'
import api from '../api'

const Users = () => {
  console.log(api.users.fetchAll())

  const [users, setUsers] = useState(api.users.fetchAll())

  const handlerDelete = (userId) => {
    const newUser = users.filter(user => user._id !== userId)
    setUsers(newUser)
  }

  return (
    <>
      <h2>
        {
          users.length > 0 ? 
            <span className="badge bg-primary">{`${users.length} человек тусанут с тобой сегодня`}</span>
            :
            <span className="badge bg-danger">Никто с тобой не тусанёт!</span>
        }
      </h2>
      {
        users.length > 0 &&
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (<tr>
                <td>{user.name}</td>
                <td>
                  {
                    user.qualities.map(el => (
                      <span className={`badge bg-${el.color}`}>{el.name}</span>
                    ))
                  }
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => handlerDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>))
            }
          </tbody>
        </table>
      }
      
    </>
  )
}
 
export default Users;