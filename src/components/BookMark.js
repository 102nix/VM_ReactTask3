import React from 'react'

export const BookMark = ({ status, handlerStatus, id }) => {

  return (
    <>
      <i className={ status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark' } onClick={() => handlerStatus(id)} style={{cursor: 'pointer'}}></i>
    </>
  )
}