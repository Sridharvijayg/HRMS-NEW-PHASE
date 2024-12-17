import React, { useContext } from 'react'
import Nav from './Nav'
import { MyContext } from '../context/MyContext'
import SideNav from './SideNav'

const NotAvailable = () => {

  const {isOpen} = useContext(MyContext)

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      <Nav />
      <SideNav />
      <main className='not-available'>
        <h2 className='fw-bold text-secondary'>Page Under Development</h2>
      </main>
    </div>
  )
}

export default NotAvailable
