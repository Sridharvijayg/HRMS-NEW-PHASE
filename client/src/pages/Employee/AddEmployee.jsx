import React, { useContext, useState } from 'react';
import '../../styles/addEmployee.css'
import { useForm } from 'react-hook-form';
import { MyContext } from '../../context/MyContext';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import Camera from '../../components/Employee/AddEmployee/Camera';
import AddForm from '../../components/Employee/AddEmployee/AddForm';
import PersonalInfoSection from '../../components/Employee/AddEmployee/PersonalInfoSection';
import Title from '../../components/Employee/AddEmployee/Title';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

const AddEmployee = () => {
  const {isOpen,setIsLoading,isLoading} = useContext(MyContext);
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async (data) => {
  
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
      setIsLoading(true)
      const response = await fetch('http://localhost:5000/api/Employee', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        const data = await response.json();
        setIsLoading(false)
        alert(data.message)
        navigate('/Employee');
      } else {
        console.log('Error adding employee');
      }
    } catch (error) {
      console.log('Error:', error);
    }finally{
      setIsLoading(false);
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
      {isLoading && <Loading />}
      <Nav />
      <SideNav />
      <main id="AddEmployee">
        <Title label={"Add New Employee"} />
        <form onSubmit={handleSubmit(handleAdd)}>
          <PersonalInfoSection />
          <div className="row">
            <Camera onFileChange={handleFileChange} preview={preview} setPreview={setPreview}/>
            <AddForm register={register} errors={errors}/>
          </div>
          <div className="button-group">
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit">
              Confirm
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddEmployee;
