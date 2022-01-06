import React from 'react'
import PropTypes from 'prop-types'
// import { useQualities } from '../../../hooks/useQualities'
import { useSelector } from 'react-redux'
import { getQualitiesByIds } from '../../../store/qualities'

export const Qualities = ({ qualities }) => {
  // const { getQuality } = useQualities()
  // const currentQualities = getQuality(qualities)
  const qualitiesList = useSelector(getQualitiesByIds(qualities))
  console.log(qualities, qualitiesList)
  return (
    <>
      {qualitiesList.map(q => (
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