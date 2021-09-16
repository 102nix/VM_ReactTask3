import React, { useState, useEffect } from 'react'
import { Pagination } from './Pagination'
// import { User } from './User'
import { SearchStatus } from './SearchStatus'
import { paginate } from '../utils/paginate'
import { GroupList } from '../components/GroupList'
import api from '../api'
import { UsersTable } from './UsersTable'
import _ from 'lodash'

export const Users = () => {

  const [allUsers, setUsers] = useState([])
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: "asc"})

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
        user.bookmark = !user.bookmark
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
    // ? allUsers.filter(user => user.profession._id === selectedProf._id) 
    ? allUsers.filter(user => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : allUsers
  const count = filteredUsers.length
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
  const users = paginate(sortedUsers, currentPage, pageSize)

  //pagination

  const handleProfessionalSelect = item => {
    setCurrentPage(1)
    setSelectedProf(item)
  }

  const clearFilter = () => {
    setSelectedProf()
  }

  const handleSort = (item) => {
    setSortBy(item)
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
          <UsersTable  
            users={users}
            selectedSort={sortBy}
            onStatus={handlerStatusBookmark}
            onDelete={handlerDelete}
            onSort={handleSort}
          />
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

