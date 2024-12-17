import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Msg from '../Msg'
import { MyContext } from '../../context/MyContext'
import {Link, useNavigate} from 'react-router-dom'

const LoginForm = () => {

    const {msg,setIsCheckedIn,email,setEmail,password,setPassword,isVisible,setIsVisible,setEmployee,setLogin,setToken,user,setUser,isAdmin,setIsAdmin} = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
      
        const PostOption = {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        };
      
        try {
          const response = await fetch('http://localhost:5000/api/Login', PostOption);
          const data = await response.json();
          
          if (!response.ok) {
            return toast("invalid credentials",{theme:"dark"})
          }
          
          if(data.login){
            await setToken(data.token);
            await localStorage.setItem('token',data.token)
            toast(data.message,{theme:"dark"})
            await setEmployee(data.employee);
            await setLogin(data.login);
            if(data.employee.role == 'admin'){
            setIsAdmin(true);
            navigate('/admin');
            }else{
              navigate('/emp')
            }

            function formatDate(date) {
              const d = new Date(date);
              const year = d.getFullYear();
              const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
              const day = String(d.getDate()).padStart(2, '0');
              return `${year}-${month}-${day}`;
            }

            const startDate = formatDate(Date.now());
            const endDate = formatDate(Date.now());

            // Fetch data with formatted dates
            const checkinResponse = await fetch(`http://localhost:5000/api/Attendance/attendance-report/${data.employee.employeeId}?startDate=${startDate}&endDate=${endDate}`);
            const checkinData = await checkinResponse.json();
            

            if (checkinData) {
              if (checkinData[checkinData.length-1].status === "CheckIn") {
                setIsCheckedIn(true);
              } else {
                setIsCheckedIn(false);
              }
            }

          }
          
      
        } catch (err) {          
          toast("Error fetching !!",{theme:"dark"})
        
        }
      };
      

  return (
    <div  className='login-box'>
    <ToastContainer/>
    <form className='login-form'>
    <h2 className='login'>Login</h2>
    {msg && <Msg />}
    <div className="input-box">
    <label htmlFor="email">Email</label>
    <input 
    type="email" 
    required 
    id='email'
    placeholder='Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    </div>

    <div className="input-box">
    <label htmlFor="password">Password</label>
    <input 
    type={isVisible?"text":"password" }
    required 
    id='password' 
    placeholder='Password'
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
    />
    </div>

    <div className="checkbox">
    <input 
    type="checkbox" 
    name="show-password" 
    id="show-password"
    checked={isVisible}
    onChange={()=>setIsVisible(!isVisible)}
    />
    <label htmlFor="show-password">Show Password</label>
    </div>

    <button type='submit' onClick={(e)=>handleLogin(e)}>Submit</button>
    <Link to='/login/reset' className='links'>forget Password ?</Link>
  </form>
  </div>
  )
}

export default LoginForm
