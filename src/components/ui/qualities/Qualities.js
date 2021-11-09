import React from 'react'
import PropTypes from 'prop-types'

export const Qualities = ({ qualities }) => {
  return (
    <>
      {qualities.map((el) => (
        <span className={`badge bg-${el.color}`} key={el._id}>
          {el.name}
        </span>
      ))}
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
}