  import React, { useContext } from 'react'
  import '../styles/nav.css'
  import logo from '../assets/image/logo.jpg'
  import { FaRegBell } from "react-icons/fa6";
  import { MdMenu } from "react-icons/md";
  import { MyContext } from '../context/MyContext';
  
  const Nav = () => {
    const {employee,handleToggle} = useContext(MyContext);
  
    return (
      <nav>
          <div>
            <MdMenu className='toggled-icon' onClick={handleToggle}/>
            <span className='fw-bold fs-4 text-secondary nav-title'></span>
          </div>
          <div className='icons'>
            <div className="img-container">
                <img src={employee.profilePictureUrl?employee.profilePictureUrl:logo} alt="logo" />
            </div>
            <div className="icon-container">
                <FaRegBell className='profile-icon'/>
            </div>
          </div>
      </nav>
    )
  }
  
  export default Nav
  
