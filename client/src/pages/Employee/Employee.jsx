import React, { useContext, useEffect, useState } from 'react'
import '../../styles/employee.css'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../context/MyContext'
import { IoAddCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
// import Overlay from "../components/Employee/Overlay";
import Table from "../../components/Employee/Table";
import SideNav from '../../components/SideNav'

const Employee = () => {
  const [refreshKey,setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const { setIsLoading,isLoading,searchInput, setSearchResult,searchResult, handleSearchChange,isOpen,employees,setEmployees,handleDeleteClick} =
    useContext(MyContext);
  
    useEffect(()=>{
      const fetchData = async()=>{
      try{
        setIsLoading(true)
        const response = await fetch('http://localhost:5000/api/Employee/page?page=1&limit=10')
      const data = await response.json();
      setEmployees(data.employees);
      setSearchResult(data.employees);
      }catch(err){
        console.log(err);
      }finally{
      setIsLoading(false);
      }
  }
  fetchData();
},[refreshKey])

 const handleDelete = async (employeeId) => {
     try {
       const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
       if (!confirmDelete) return;
 
       const response = await fetch(`http://localhost:5000/api/Employee/${employeeId}`, { 
         method: 'DELETE',
       });
 
       if (response.ok) {
         // Remove the deleted employee from the state
         setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
         alert('Employee deleted successfully');
         setRefreshKey(prev=>prev+1);
       } else {
         alert('Error deleting employee');
       }
     } catch (error) {
       console.error('Error:', error);
       alert('Error deleting employee');
     }
   };

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading && <Loading />}
      <Nav />
      <SideNav />
      <main id="Employee">
        <div className={isOpen?"main-header active":"main-header"}>
          <h3 className="fw-bold">Employee</h3>
          <div className="right-box">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search form-control"
                placeholder="Search"
                value={searchInput} 
                onChange={handleSearchChange}
              />
            </div>
            <button onClick={() => navigate("/employee/add")}>
              <IoAddCircleOutline className="add-icon" />
              Add New Employee
            </button>
          </div>
        </div>
        <div className="table-outer">
          <div className="table table-responsive">
            <Table searchResult={searchResult} handleDelete={handleDelete}/>
          </div>
        </div>
      
      </main>
    </div>
  );
};

export default Employee;
