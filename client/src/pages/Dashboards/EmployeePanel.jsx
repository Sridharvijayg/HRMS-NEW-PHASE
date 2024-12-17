import React, { useContext, useState } from 'react'
import ESideNav from '../../components/ESideNav'
import Nav from '../../components/Nav'
import Loading from '../../components/Loading'
import { MyContext } from '../../context/MyContext'
import DetailView from '../../components/Employee/ViewEmployee/DetailView'
import CameraPrev from '../../components/Employee/ViewEmployee/CameraPrev'

const EmployeePanel = () => {
    const {isLoading,employee,isOpen} = useContext(MyContext);
    const [preview,setPreview] = useState(employee.profilePictureUrl);
    
  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading && <Loading />}
      <ESideNav/>
      <Nav title="Employee Panel"/>
      <main id="AddEmployee">
      <div className="row view">
        <CameraPrev preview={preview} />
        <DetailView label={'Name'} data={employee.name || 'N/A'} />
        <DetailView label={'Employee ID'} data={employee.employeeId || 'N/A'} />
        <DetailView label={"Department"} data={employee.department || 'N/A'} />
        <DetailView label={"Designation"} data={employee.position || 'N/A'} />
        <DetailView label={"Date Of Birth"} data={employee.dob.split('T')[0] || 'N/A'} />
        <DetailView label={"Gender"} data={employee.gender || 'N/A'} /> 
        <DetailView label={"Contact"} data={employee.contact || 'N/A'} />
        <DetailView label={"Address"} data={employee.address || 'N/A'} />
      </div>
    </main>
    </div>
  )
}

export default EmployeePanel
