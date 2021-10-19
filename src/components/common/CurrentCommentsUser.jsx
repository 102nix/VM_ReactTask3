import React from "react"
import { getMilliseconds } from '../../utils/nameOfMinutes'
import { getUserName } from "../../utils/calculateFoeComments"

export const CurrentCommentsUser = ({ comments, allUsers, deleteComment }) => {

  // const getUserName = (id) => {
  //   let findUser
  //   allUsers.forEach((user) => {
  //     if (user.UserId === id) {
  //       findUser = user.name
  //     }
  //   })
  //   return findUser
  // }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h2>Comments</h2>
        <hr />
        {comments
        .sort((a, b) => a.created_at > b.created_at ? -1 : 1)
        .map((comment) => (
          <div key={comment._id} className="bg-ligth card-body mb-3">
            <div className="row">
              <div className="col">
                <div className="d-flex flex-start">
                  <img
                    src={`https://avatars.dicebear.com/api/avataaars/${(
                      Math.random() + 1
                    )
                      .toString(36)
                      .substring(7)}.svg`}
                    classNameName="rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                  />
                  <div className="flex-grow-1 flex-shrink-1">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                          {getUserName(allUsers, comment.UserId)} <span className="small">
                            {getMilliseconds(comment.created_at)} 
                          </span>
                        </p>
                        <button 
                          className="btn btn-sm text-primary d-flex align-items-center"
                          onClick={() => deleteComment(comment._id)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </div>
                      <p className="small">{comment.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
