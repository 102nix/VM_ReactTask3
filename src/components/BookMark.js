import React, { useState } from 'react'

export const BookMark = () => {

  const [myClassName, setMyClassName] = useState('bi bi-bookmark')

  const changeCls = () => {
    if (myClassName === 'bi bi-bookmark') {
      setMyClassName('bi bi-bookmark-fill')
    } else {
      setMyClassName('bi bi-bookmark')
    }
  }

  return (
    <>
      <i className={ myClassName } onClick={changeCls} style={{cursor: 'pointer'}}></i>
    </>
  )
}