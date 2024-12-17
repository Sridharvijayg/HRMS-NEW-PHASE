import React, { useContext, useState } from 'react'
import '../../styles/employee.css'
import SideNav from '../../components/SideNav'
import Nav from '../../components/Nav'
import { MyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import Title from '../../components/Employee/AddEmployee/Title';

const AddDepartment = () => {
    const navigate = useNavigate();
    const [department,setDepartment]= useState('');
    const {setIsLoading,isLoading,isOpen} = useContext(MyContext);

    const handleAddDepartment = async(e) => {
        e.preventDefault();
        const PostOption = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              department: department,
            })
          };
        
          try {
            setIsLoading(true)
            const response = await fetch('http://localhost:5000/api/Department/', PostOption);
            if (!response.ok) {
               return;
            }
            const data = await response.json();
            setIsLoading(false)
            alert(data.message);
            setDepartment('');
            navigate('/Department');
          } catch (err) {
            console.log(err.message);
          }finally{
            setIsLoading(false)
          }
    }

    function handleCancel(){
      setDepartment("");
    }
  
    return (
      <div className={isOpen?"Grid-box active":"Grid-box"}>
      {isLoading && <Loading />}
      <SideNav/>
      <Nav title='Add Department'/>
      <main id="AddEmployee">
            <form onSubmit={(e)=>handleAddDepartment(e)}>
            <Title label={"Add New Department"} />
            <br />
                <div className="row w-100 container-fluid">
                <div className="col col-12 col-md-12 col-lg-12">
                    <label htmlFor="department">Department<span>*</span></label>
                    <input
                      className="w-100"
                      type="text"
                      autoFocus
                      value={department}
                      onChange={(e)=>setDepartment(e.target.value)}
                      id="department"
                      placeholder="Enter New Department"
                    />
                </div>
                <div className="button-group">
                  <button type="button" className="cancel" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="submit" className="submit">
                    Confirm
                  </button>
                </div>
                </div>
            </form>
       
        </main>
     </div>

  )
}

export default AddDepartment
