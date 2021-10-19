import React from 'react'
import { MeetingsCard } from '../common/MeetingsCard'
import { QualitiesCard } from '../common/QualitiesCard'
import { UserCard } from '../common/UserCard'

export const UserInfoCard = ({ user, userId }) => {
  return (
    <>
      <UserCard 
        user={user}
        userId={userId}
      />
      <QualitiesCard user={user} />
      <MeetingsCard user ={user} />
    </>
  )
}