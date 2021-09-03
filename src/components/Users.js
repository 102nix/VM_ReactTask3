import React, { useState } from 'react'
import { Pagination } from './Pagination'
import { User } from './User'
import { SearchStatus } from './SearchStatus'
import { paginate } from '../utils/paginate'
import api from '../api'

export const Users = ({users: allUsers, onDelete}) => {

  const count = allUsers.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    console.log('page: ', pageIndex)
    setCurrentPage(pageIndex)
  }

  const users = paginate(allUsers, currentPage, pageSize)

  return (
    <>
      <h2>
        <SearchStatus length={count}  />
      </h2>
      {
        count > 0 &&
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
      <Pagination 
        itemsCount={count} 
        pageSize={pageSize} 
        onPageChange={handlePageChange}
        currentPage={currentPage} 
      />
    </>
  )
}

