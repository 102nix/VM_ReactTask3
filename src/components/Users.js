import React, { useState, useEffect } from 'react'
import { Pagination } from './Pagination'
import { User } from './User'
import { SearchStatus } from './SearchStatus'
import { paginate } from '../utils/paginate'
import { GroupList } from '../components/GroupList'
import api from '../api'

export const Users = () => {

  const [allUsers, setUsers] = useState([])
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()


  useEffect(() => {
    api.professions.fetchAll().then(data => setProfessions(data))
    api.users.fetchAll().then(data => setUsers(data))
  }, [])

  const handlerDelete = (userId) => {
    const newUser = allUsers.filter(user => user._id !== userId)
    setUsers(newUser)
  }

  const handlerStatusBookmark = (userId) => {
    const newUsers = allUsers.map(user => {
      if (user._id === userId) {
        user.status = !user.status
      }
      return user
    })
    setUsers(newUsers)
  }

  //pagination
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  const filteredUsers = selectedProf 
    ? allUsers.filter(user => user.profession._id === selectedProf._id) 
    : allUsers
  const count = filteredUsers.length

  const users = paginate(filteredUsers, currentPage, pageSize)

  //pagination

  const handleProfessionalSelect = item => {
    setCurrentPage(1)
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex">
      {professions &&
      <div className="d-flex flex-column flex-shrink-0 p-3">
        <GroupList 
          selectedItem={selectedProf}
          items={professions} 
          onItemSelect={handleProfessionalSelect}
        />
        <button className="btn btn-secondary mt-2" onClick={clearFilter}>Очистить</button>
      </div>
      }
      <div className="d-flex flex-column">
        
        {allUsers.length === 0
          ? <h2>Loading...</h2>
          : <SearchStatus length={count}  />
        } 
        {count > 0 &&
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
                users.map(user => (<tr key={user._id}>
                  <User
                    id={user._id}
                    name={user.name}
                    qualities={user.qualities} 
                    profession={user.profession}
                    completedMeetings={user.completedMeetings}
                    rate={user.rate}
                    status={user.status}
                    onStatus={handlerStatusBookmark}
                  />
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
        <div className="d-flex justify-content-center">
          <Pagination 
            itemsCount={count} 
            pageSize={pageSize} 
            onPageChange={handlePageChange}
            currentPage={currentPage} 
          />
        </div>
      </div>
    </div>
  )
}

