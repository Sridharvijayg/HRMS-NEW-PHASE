import React, { useContext } from 'react'
import { MyContext } from '../context/MyContext'

const Msg = () => {

  const {msg} = useContext(MyContext);

  return (
    <div className='Msg-box'>
      <p>{msg}</p>
    </div>
  )
}

export default Msg
