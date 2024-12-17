import React, { useContext } from 'react'
import SideNav from '../../components/SideNav';
import Nav from '../../components/Nav';
import { MyContext } from '../../context/MyContext';
import Loading from '../../components/Loading';
import EmployeeDepartmentChart from '../../components/EmployeeDepartmentChart';


const AdminPanel = () => {

  const {employees,departments,isLoading,attendance,isOpen,employee}= useContext(MyContext);

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading &&  <Loading/>}
      <SideNav/>
      <Nav title='DASHBOARD'/>
      <main>
      <div className="Admin-info">
        <div className="info-box">
          Hello, {employee.name}
        </div>
        <div className="info-box">
          <p>No of Employee</p>
          <p>{employees.length}</p>
        </div>
        <div className="info-box">
          <p>No of Department</p>
          <p>{departments.length}</p>
        </div>
        <div className="info-box">
          <p>Attendance Percentage</p>
          <p>{attendance>0 ? attendance : 0 }%</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart-box">
        <EmployeeDepartmentChart employeeData={employees}/>
        </div>
        
      </div>
      </main>
    </div>
  )
}

export default AdminPanel
