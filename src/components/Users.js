import React, { useState, useEffect } from 'react'
import { Pagination } from './Pagination'
import { User } from './User'
import { SearchStatus } from './SearchStatus'
import { paginate } from '../utils/paginate'
import { GroupList } from '../components/GroupList'
import api from '../api'
import { UsersTable } from './UsersTable'
import _ from 'lodash'
import { useParams } from 'react-router-dom'

export const Users = () => {

  const [allUsers, setUsers] = useState([])
  const [professions, setProfessions] = useState()
  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({path: 'name', order: "asc"})

  const [searchName, setSearchName] = useState('') //for input search
  const [findUsersArr, setFindUsersArr] = useState(null)

  const handlerSearchName = (e) => {
    setSearchName(e.target.value)
    const findUsers = []
    allUsers.forEach(user => {
      if (user.name.indexOf(e.target.value) !== -1) {
        findUsers.push(user)
      }
    })
    setFindUsersArr(findUsers)
  }

  const params = useParams()
  const { userId } = params

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
 
  const sortedUsers = _.orderBy( findUsersArr ? findUsersArr: filteredUsers, [sortBy.path], [sortBy.order])
  
  const users = paginate(sortedUsers, currentPage, pageSize)

  //pagination

  const handleProfessionalSelect = item => {
    setCurrentPage(1)
    setSelectedProf(item)
    setFindUsersArr(null)
    setSearchName('')
  }

  const clearFilter = () => {
    setSelectedProf()
    setFindUsersArr(null)
    setSearchName('')
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  return (
    <>
      {
        userId ? (
          <User id={userId} />
        ) : (
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
            <input
              type="text" 
              placeholder="Search..."
              value={searchName}
              onChange={(e) => handlerSearchName(e)}
            /> 
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
    </>

  )
}

