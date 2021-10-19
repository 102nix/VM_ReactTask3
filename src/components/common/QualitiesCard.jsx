import React from 'react'
import { Qualities } from '../ui/qualities/Qualities'

export const QualitiesCard = ({ user }) => {
  return (
    <div className="card mb-3">
    <div className="card-body d-flex flex-column justify-content-center text-center">
      <h5 className="card-title">
        <span>Qualities</span>
      </h5>
      <p className="card-text">
        {user.qualities && <Qualities qualities={user.qualities} />}
      </p>
    </div>
  </div>
  )
}