import React from 'react'

export const Qualities = ({qualities}) => {
  return (
    <>
      {
        qualities.map(el => (
          <span className={`badge bg-${el.color}`}>{el.name}</span>
        ))
      }
    </>
  )
}