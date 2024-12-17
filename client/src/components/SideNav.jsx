import React, { useContext } from 'react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import { LuCalendarDays } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsLayoutSplit } from "react-icons/bs";
import { TbLayoutGrid } from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { MdToday } from "react-icons/md";
import { GoStack } from "react-icons/go";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MyContext } from '../context/MyContext';
import CheckInOutToggle from './CheckInOutToggle';



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
          to='/admin'
          className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'dashboard')}
        >
          <TbLayoutGrid className="icon" /> Dashboard
        </Link>
        <Link
          to='/employee'
          className={`nav-link ${activeLink === 'employee' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'employee')}
        >
          <FaRegCircleUser className="icon" /> Employee
        </Link>
        <Link
          to='/Department'
          className={`nav-link ${activeLink === 'department' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'department')}
        >
          <BsLayoutSplit className="icon" /> Department
        </Link>
        <Link
          to='/Attendance'
          className={`nav-link ${activeLink === 'attendance' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'attendance')}
        >
          <IoMdCheckboxOutline className="icon" /> Attendance
        </Link>
        <Link
          to='/Leave'
          className={`nav-link ${activeLink === 'leaves' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'leaves')}
        >
          <HiOutlineDocumentPlus className="icon" /> Leaves
        </Link>
        <Link
          to='/calender'
          className={`nav-link ${activeLink === 'calendar' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'calendar')}
        >
          <LuCalendarDays className="icon" /> Calendar
        </Link>
        <Link
          to='/not-available'
          className={`nav-link ${activeLink === 'project' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'project')}
        >
          <GoStack className="icon" /> Project
        </Link>
        <Link
          to='/not-available'
          className={`nav-link ${activeLink === 'holiday' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'holiday')}
        >
          <MdToday className="icon" /> Holiday
        </Link>
        <Link
          to='/not-available'
          className={`nav-link ${activeLink === 'payrolls' ? 'active' : ''}`}
          onClick={(e) => handleLinkClick(e,'payrolls')}
        >
          <CgFileDocument className="icon" /> payrolls
        </Link>
      </div>
    </aside>
  );
};

export default SideNav;
