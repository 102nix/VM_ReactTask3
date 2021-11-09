import React from 'react'
import { useProfessions } from '../../hooks/useProfession'
import PropTypes from 'prop-types'

export const Profession = ({ id }) => {
  console.log(id)
  const { isLoading, getProfession } = useProfessions()
  const prof = getProfession(id)
  console.log(prof.name)
  if (!isLoading) {
    return <p>{prof.name}</p>
  }
  return 'Loading...'
}

Profession.propTypes = {
  id: PropTypes.string
}