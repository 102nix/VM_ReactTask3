import React from 'react'

export const Qualities = ({qualities}) => {
  return (
    <>
      {
        qualities.map(el => (
          <span 
            className={`badge bg-${el.color}`}
            key={el._id}
          >
            {el.name}
          </span>
        ))
      }
    </>
  )
}