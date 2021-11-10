import React from 'react'
import PropTypes from 'prop-types'
import { useQualities } from '../../../hooks/useQualities'

export const Qualities = ({ qualities }) => {
  const { getQuality } = useQualities()
  const currentQualities = getQuality(qualities)
  return (
    <>
      {currentQualities.map(q => (
        <span className={`badge bg-${q.color}`} key={q._id}>
          {q.name}
        </span>))
      }
    </>
  )
}

Qualities.propTypes = {
  qualities: PropTypes.array
}