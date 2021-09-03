import React from 'react'
import { Qualities } from './Qualities'
import { BookMark } from './BookMark'

export const User = ({ name, qualities, profession, completedMeetings, rate, status, onStatus, id }) => {
  return (
    <>
      <td>{name}</td>
      <td>
        <Qualities 
          qualities={qualities} 
        />
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <BookMark
            status={status}
            handlerStatus={onStatus}
            id={id}
        />
      </td> 
    </>
  )
}


