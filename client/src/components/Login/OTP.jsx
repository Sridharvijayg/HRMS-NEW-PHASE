import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';

const OTP = () => {

    const {otp,setOtp,msg,setMsg} = useContext(MyContext);
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();

          try {
            const response = await fetch(`http://localhost:5000/api/Login/reset_password/${otp}`);
            const data = await response.json();
            
            if (!response.ok) {
              return toast(data.message,{theme:"dark"})
            }
            
           toast(data.message,{theme:"dark"})
            navigate('/login/update-password')

        
          } catch (err) {
            console.log("An error occurred while generate Otp");
          }
    }

  return (
    <div  className='login-box'>
      <ToastContainer />
    <form className='login-form'>
        <h2 className='login'>Enter OTP</h2>
        
        <div className="input-box">
        <label htmlFor="otp">Please Verify OTP</label>
        <input 
        type="text" 
        required 
        id='otp'
        value={otp}
        onChange={(e)=>setOtp(e.target.value)}
        placeholder='OTP'
        />
        </div>
        <button type='submit' onClick={(e)=>handleVerify(e)}>Verify</button>
      </form>
      </div>
  )
}

export default OTP
