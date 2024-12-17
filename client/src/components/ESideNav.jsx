import React, { useContext } from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
import { TbLayoutGrid } from "react-icons/tb";
import { LuCalendarDays } from "react-icons/lu";
import { MyContext } from '../context/MyContext';
import CheckInOutToggle from '../components/CheckInOutToggle'


const SideNav = () => {

  const {activeLink,setActiveLink,isOpen} = useContext(MyContext);

  const handleLinkClick = (e,link) => {
    setActiveLink(link); 
  };

  return (
    <aside className={isOpen?"active":""}>
      <div className='title'>
        <p className='text-success'>HRMS</p>
      </div>
      <div className="check-in-out">
        <CheckInOutToggle />
      </div>
      <div className='nav-links'>
        <Link
          to='/emp'
          className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'dashboard')}
        >
        <FaRegCircleUser className="icon" /> Profile
        </Link>
        <Link
          to='/ELeave'
          className={`nav-link ${activeLink === 'eleave' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'eleave')}
        >
          <TbLayoutGrid className="icon" /> Leave
        </Link>
        <Link
            to='/employeecalender'
            className={`nav-link ${activeLink === 'calendar' ? 'active' : ''}`}
            onClick={(e) => handleLinkClick(e,'calendar')}
          >
            <LuCalendarDays className="icon" /> Calendar
          </Link>
      </div>
    </aside>
  );
};

export default SideNav;
