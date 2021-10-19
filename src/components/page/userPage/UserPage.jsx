import React, { useEffect, useState } from "react";
import api from "../../../api/index"
import { UserInfoCard } from "../../ui/UserInfoCard";
import { CurrentCommentsUser } from '../../common/CurrentCommentsUser'
import { AddNewComment } from "../../common/AddNewComment"

export const UserPage = ({ userId }) => {

  const [user, setUser] = useState()
  const [qualities, setQualities] = useState({})
  const [allUsers, setUsers] = useState([])
  const [commentsCurrentUser, setCommentsCurrentUser] = useState([])

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
    api.users.fetchAll().then(data => setUsers(data))
    api.comments.fetchCommentsForUser(userId).then((data) => setCommentsCurrentUser(data))
  }, [])

  const deleteComment = (id) => {
    api.comments.remove(id)
    api.comments.fetchCommentsForUser(userId).then((data) => setCommentsCurrentUser(data))
  }

  return (
    <>
      {user ? (
        <div className="container">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <UserInfoCard
                user={user}
                userId={userId}
                qualities={qualities}
              />
            </div>
            <div className="col-md-8">
              <AddNewComment allUsers={allUsers} />
              {commentsCurrentUser.length > 0 &&
                <CurrentCommentsUser 
                  comments={commentsCurrentUser}
                  allUsers={allUsers}
                  deleteComment={deleteComment}
                />
              } 
            </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  )
}
