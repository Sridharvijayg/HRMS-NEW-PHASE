import React, { useContext, useEffect, useState } from 'react';
import '../../styles/employee.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../context/MyContext';
import Camera from '../../components/Employee/AddEmployee/Camera';
import Nav from '../../components/Nav';
import Sidebar from '../../components/SideNav';
import Title from '../../components/Employee/AddEmployee/Title';
import PersonalInfoSection from '../../components/Employee/AddEmployee/PersonalInfoSection';
import EmployeeForm from '../../components/Employee/UpdateEmployee/EmployeeForm';
import Loading from '../../components/Loading';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { isOpen,isLoading } = useContext(MyContext);
  const { employeeId } = useParams();
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/Employee/view/${employeeId}`);
        const data = await response.json();
        if(data){
          toast("Employee Fetched Successfully",{theme:"dark"})
        }
        setValue('id', data.employeeId);
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('department', data.department);
        setValue('position', data.position);
        setValue('dob', data.dob.split('T')[0]);
        setValue('address', data.address);
        setValue('contact', data.contact);
        setValue('gender', data.gender);
        if (data.profilePictureUrl) {
          setPreview(data.profilePictureUrl);
        }
      } catch (error) {
        console.log('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleUpdateEmployee = async (data) => {

    const formData = new FormData();
    formData.append('employeeId', data.id);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('position', data.position);
    formData.append('department', data.department);
    formData.append('dob', data.dob);
    formData.append('address', data.address);
    formData.append('contact', data.contact);
    formData.append('gender', data.gender);

    if (data.file && data.file[0]) {
      formData.append('profilePictureUrl', data.file[0]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/Employee/${employeeId}`, {
        method: 'PUT',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate('/Employee');
      } else {
        console.log('Error updating employee');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleFileChange = (file) => {
    setValue('file', file ? [file] : [], { shouldValidate: true });
  };

  const handleCancel = () => {
    reset();
    setPreview(null);
  };

  return (
    <div className={isOpen?"Grid-box active":"Grid-box"}>
      <ToastContainer />
      {isLoading && <Loading />}
      <Nav />
      <Sidebar />
      <main id="AddEmployee">
        <Title label={"Edit Employee Details"}/>
        <form onSubmit={handleSubmit(handleUpdateEmployee)}>
           <PersonalInfoSection />
          <div className="row">
            <Camera onFileChange={handleFileChange} preview={preview} setPreview={setPreview}/>
            <EmployeeForm handleCancel={handleCancel} register={register} errors={errors}/>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UpdateEmployee;
