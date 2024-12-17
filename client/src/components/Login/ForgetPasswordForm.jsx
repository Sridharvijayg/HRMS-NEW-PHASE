import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordForm = () => {
    
    const {email,setEmail,msg,setMsg} = useContext(MyContext);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();

        const PostOption = {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email
            })
          };
        
          try {
            const response = await fetch('http://localhost:5000/api/Login/reset_password', PostOption);
            const data = await response.json();
            
            if (!response.ok) {
              return toast(data.message,{theme:"dark"})
            }
            
            toast(data.message,{theme:"dark"})
            navigate('/login/otp')

        
          } catch (err) {
            console.log("An error occurred while generate Otp");
          }
    }

  return (
    <div  className='login-box'>
      <ToastContainer/>
    <form  className='login-form'>
        <h2 className='login'>Forget Password</h2>
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
        <button type='submit' onClick={(e)=> handleReset(e)}>Send OTP</button>
      </form>
      </div>
  )
}

export default ForgetPasswordForm
