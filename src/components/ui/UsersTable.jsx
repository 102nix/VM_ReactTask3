import React from "react";
import PropTypes from 'prop-types'
// import { TableHeader } from "./TableHeader"
// import { TableBody } from "./TableBody"
import { BookMark } from "../common/BookMark"
import { Qualities } from "./qualities/Qualities"
import Table from "../common/table";
import { Link } from 'react-router-dom'

export const UsersTable = ({users, onSort, onStatus, selectedSort,  onDelete}) => {
  
  const columns = {
    // name: {path:'name', name:'Имя'},
    name: {
      path:'name', 
      name:'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качество',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession:{path:'profession.name', name:'Профессия'},
    completedMeetings:{path:'completedMeetings', name:'Встретился раз'},
    rate:{path:'rate', name:'Оценка'},
    bookmark: {
      path:'bookmark', 
      name:'Избранное', 
      component: (user) => (
        <BookMark
          bookmark={user.bookmark}
          handlerStatus={onStatus}
          id={user._id}
        />
      )
    },
    delete:{component: (user) =>  (<button
      type="button"
      className="btn btn-danger"
      onClick={() => onDelete(user._id)}
    >
      delete
    </button>)}
  }

  return (
    <Table 
      onSort={onSort} 
      selectedSort={selectedSort} 
      columns={columns} 
      data={users}
    />
  )
}

UsersTable.protoTypes={
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  currentSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}
