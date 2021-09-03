import React, {useState} from 'react'
import { User } from './User'
import { SearchStatus } from './SearchStatus'
import api from '../api'

export const Users = ({users, onDelete}) => {
  // console.log(api.users.fetchAll())

  return (
    <>
      <h2>
        <SearchStatus length={users.length}  />
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
              <th>Избранное</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {
              users.map(user => (<tr>
                <User
                  name={user.name}
                  qualities={user.qualities} 
                  profession={user.profession}
                  completedMeetings={user.completedMeetings}
                  rate={user.rate}
                 />
                <td>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
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

