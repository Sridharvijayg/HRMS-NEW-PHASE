import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav';
import Sidebar from '../../components/SideNav';
import CameraPrev from '../../components/Employee/ViewEmployee/CameraPrev';
import DetailView from '../../components/Employee/ViewEmployee/DetailView';
import PersonalInfoSection from '../../components/Employee/AddEmployee/PersonalInfoSection';
import Title from '../../components/Employee/AddEmployee/Title';
import { MyContext } from '../../context/MyContext';
import Loading from '../../components/Loading';

const ViewEmployee = () => {
  const { isOpen, isLoading, setIsLoading } = useContext(MyContext);
  const { employeeId } = useParams(); 
  const [employee, setEmployee] = useState(null); 
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:5000/api/Employee/view/${employeeId}`);
        if (response.ok) {
          const data = await response.json();
          toast("Employee Fetched Successfully",{theme:"dark"})

          if (data) {
            setEmployee(data);

            if (data.profilePictureUrl) {
              setPreview(data.profilePictureUrl);
            }
          } else {
            alert('Error: Employee data not found');
          }
        } else {
          alert(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error('Error fetching employee data:', error);
        alert('An unexpected error occurred. Please try again.');
      }finally{
        setIsLoading(false)
      }
    };

    fetchEmployee();
  }, [employeeId]);

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      <ToastContainer />
      {isLoading && <Loading />}
      <Nav />
      <Sidebar />
      {!employee?<Loading />:
      <main id="AddEmployee">
      <Title label={"View Employee Details"} />
      <div className="row view">
        <form>
          <PersonalInfoSection />
        </form>
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
    </main>}
    </div>
  );
};

export default ViewEmployee;
