import React, { createContext, useEffect, useState } from 'react'

export const MyContext = createContext(); 

const MyContextProvider = ({children}) => {

  // Login states
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [otp,setOtp] = useState('');
    const [newPassword,setNewPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [isVisible,setIsVisible] = useState(false);
    const [msg,setMsg] = useState('');
    const [token,setToken] = useState('');
    const [login,setLogin] = useState(false);
    const [isAdmin,setIsAdmin] = useState(false);

    // Employee States
    const [employee,setEmployee] = useState(null);
    const [employees,setEmployees] = useState([]);
    const [isPassVisible,setIsPassVisible] = useState(false);
    const [departments,setDepartments]= useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [attendance,setAttendance] = useState();
    const [user,setUser] = useState();
    const [activeLink, setActiveLink] = useState("dashboard");
    const [isOpen,setIsOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResult, setSearchResult] = useState(employees);
    const [showOverlay, setShowOverlay] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    useEffect(()=>{
      const fetchData = async()=>{
          try{
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Employee/page?page=1&limit=10')
            const data = await response.json();
            setEmployees(data.employees);
            const response1 = await fetch('http://localhost:5000/api/Department')
            const data1 = await response1.json();
            setDepartments(data1);
            const response2 = await fetch('http://localhost:5000/api/Attendance/attendance-report')
            const data2 = await response2.json(); 
            if(data2.attendanceRecords.length){
              setAttendance(((Number(data2.attendanceRecords.length) / Number(data.employees.length)) * 100).toFixed(2));
            }else{
              setAttendance(0)
            }

          }catch(err){
            console.log(err);
          }finally{
            setIsLoading(false)
          }
      }
      fetchData();
  },[])

  const handleToggles = async () => {
    setIsCheckedIn((prev) => !prev);

    try {
      if (!isCheckedIn) {
        // Check-in API call
        const checkinResponse = await fetch("http://localhost:5000/api/Attendance/check-in", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: employee.employeeId,
          }),
        });
        const checkinData = await checkinResponse.json();
      } else {
        // Check-out API call
        const checkoutResponse = await fetch("http://localhost:5000/api/Attendance/check-out", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            employeeId: employee.employeeId,
          }),
        });
        const checkoutData = await checkoutResponse.json();
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleToggle = ()=>{
    setIsOpen(!isOpen)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(value.toLowerCase().trim()) ||
        String(emp.id).trim().includes(value.trim())
      );
      setSearchResult(filteredEmployees);
    } else {
      setSearchResult(employees);
    }
  };
    
  const handleDeleteClick = (employeeId) => {
  setEmployeeToDelete(employeeId);
  setShowOverlay(true);
  };
  
  const handleCancelDelete = () => {
    setEmployeeToDelete(null);
    setShowOverlay(false);
  };

  return (
    <MyContext.Provider value={{email,setEmail,password,setPassword,otp,setOtp,newPassword,setNewPassword,confirmPassword,setConfirmPassword,msg,setMsg,isVisible,setIsVisible,token,setToken,login,setLogin,employee,setEmployee,isPassVisible,setIsPassVisible,departments,setDepartments,employees,setEmployees,isAdmin,setIsAdmin,isLoading,setIsLoading,attendance,setAttendance,user,setUser,activeLink,setActiveLink,isOpen,setIsOpen,handleToggle,handleSearchChange,searchInput,setSearchInput,searchResult,setSearchResult,isCheckedIn,setIsCheckedIn,handleToggles
    }}>
        {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider
