import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';
import { MyContext } from "./context/MyContext";
import LoginForm from "./components/Login/LoginForm";
import ForgetPasswordForm from "./components/Login/ForgetPasswordForm";
import OTP from "./components/Login/OTP";
import UpdatePassword from "./components/Login/UpdatePassword";
import AdminPanel from "./pages/Dashboards/Dashboard";
import Employee from "./pages/Employee/Employee";
import AddEmployee from "./pages/Employee/AddEmployee";
import UpdateEmployee from "./pages/Employee/UpdateEmployee";
import ViewEmployee from "./pages/Employee/ViewEmployee";
import Department from "./pages/Department/Department";
import AddDepartment from "./pages/Department/AddDepartment";
import UpdateDepartment from "./pages/Department/UpdateDepartment";
import Leave from "./pages/LeavePage/Leave";
import LeaveStatus from "./pages/LeavePage/LeaveStatus";
import Attendance from "./pages/Attendance/Attendance";
import EmployeePanel from "./pages/Dashboards/EmployeePanel";
import ELeave from "./pages/LeavePage/ELeave";
import RaiseLeave from "./pages/LeavePage/RaiseLeae";
import NotAvailable from "./components/NotAvailable";
import Calender from "./pages/Calender/Calender";
import EmployeeCalender from "./pages/Calender/EmployeeCalender";

function App() {

  const {login,isAdmin} = useContext(MyContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login/reset" element={<ForgetPasswordForm />} />
        <Route path="/login/otp" element={<OTP />} />
        <Route path="/login/update-password" element={<UpdatePassword />} />
        <Route path="/admin" element={isAdmin && login ?<AdminPanel/>:<LoginForm/>}/>
        <Route path="/Employee" element={isAdmin?<Employee/>:<LoginForm/>}/>
        <Route path="/Employee/Add" element={<AddEmployee/>}/>
        <Route path="/Employee/:employeeId" element={<UpdateEmployee/>}/>
        <Route path="/employee/view/:employeeId" element={<ViewEmployee/>}/>
        <Route path="/Department" element={isAdmin && login?<Department/>:<LoginForm/>}/>
        <Route path="/Department/Add" element={<AddDepartment/>}/>
        <Route path="/Department/:id" element={<UpdateDepartment/>}/>
        <Route path="/Leave" element={<Leave/>}/>
        <Route path="/Leave/:leaveId" element={<LeaveStatus/>}/>
        <Route path="/Attendance" element={<Attendance/>}/>
        <Route path="/emp" element={login?<EmployeePanel/>:<LoginForm/>}/>
        <Route path="/ELeave" element={login?<ELeave/>:<LoginForm/>}/>
        <Route path="/raise-Leave" element={login?<RaiseLeave/>:<LoginForm/>}/>
        <Route path="/calender" element={login?<Calender/>:<LoginForm/>}/>
        <Route path="/employeecalender" element={login?<EmployeeCalender/>:<LoginForm/>}/>
        <Route path="/not-available" element={login?<NotAvailable/>:<LoginForm/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
