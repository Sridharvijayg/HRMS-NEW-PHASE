import React, { useCallback, useContext, useEffect, useState } from 'react'
import SideNav from '../../components/SideNav'
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
import DepartmentTable from '../../components/Department/DepartmentTable'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../context/MyContext'
import { IoAddCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

const Department = () => {
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const [searchResult,setSearchResult]= useState(null);
    const [searchInput,setSearchInput]= useState("");
    const {departments,setDepartments,isLoading,setIsLoading,isOpen}= useContext(MyContext);

    const refresh = () => {
      setRefreshKey(refreshKey+1);
    }

    const handleDeleteDepartment = async (id) => {

      const dep = departments.filter(dep => dep._id === id);
      
      if(window.confirm(`You want to delete the department " ${dep[0].department} " Permanantly`)){
        try{
          const PostOption = {
              method:"DELETE"
          }
          setIsLoading(true)
          const response = await fetch(`http://localhost:5000/api/Department/${id}`,PostOption)
          const data = await response.json();
          if(!response.ok){
            return alert("err")
          }
            alert(data.message);
            const after = departments.filter(dep => dep._id !== id);
            setDepartments(after);
            setIsLoading(false);
            setRefreshKey(prev=>prev+1)
      }catch(err){
          alert(err)
      }finally{
        setIsLoading(false);
      }
      }
    }

    useEffect(()=>{
      const fetchData = async()=>{
          try{
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Department')
            const data = await response.json();
            setDepartments(data);
            setSearchResult(data)
          }catch(err){
            console.log(err);
          }finally{
            setIsLoading(false)
          }
      }
      fetchData();
  },[refreshKey])

    const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      const filteredDepartments = departments.filter((dep) =>
        dep.department.toLowerCase().includes(value.toLowerCase().trim())
      );
      setSearchResult(filteredDepartments);
    } else {
      setSearchResult(departments);
    }
  };
  
    return (
      <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading && <Loading />}
      <SideNav/>
     <Nav title='Department'/>
        <main id="Employee">
        <div className={isOpen?"main-header active":"main-header"}>
          <h3 className="fw-bold">Department</h3>
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
            <button onClick={() => navigate("/department/add")}>
              <IoAddCircleOutline className="add-icon" />
              Add New Department
            </button>
          </div>
        </div>
        <div className="table-outer">
          <div className="table table-responsive">
          <DepartmentTable departments={searchResult} handleDeleteDepartment={handleDeleteDepartment}/>
          </div>
        </div>
    </main>
    </div>
  )
}

export default Department
