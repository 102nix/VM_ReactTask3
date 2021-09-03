import React from 'react'

export  const SearchStatus = ({length}) => {
  return (
    <>
      {
          length > 0 ? 
            <span className="badge bg-primary">{`${length} человек тусанут с тобой сегодня`}</span>
            :
            <span className="badge bg-danger">Никто с тобой не тусанёт!</span>
        }
    </>
  )
}