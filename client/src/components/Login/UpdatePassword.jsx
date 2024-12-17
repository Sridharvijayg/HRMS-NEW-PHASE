import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../../context/MyContext';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {

    const {newPassword,setNewPassword,confirmPassword,setConfirmPassword,msg,setMsg,otp,setIsPassVisible,isPassVisible} = useContext(MyContext);
    const navigate = useNavigate();

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
      
        try {

        if(newPassword === confirmPassword){

        const PostOption = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: newPassword
            })
            };

          const response = await fetch(`http://localhost:5000/api/Login/reset_password/${otp}`, PostOption);
          const data = await response.json();
          
          if (!response.ok) {
             return toast(data.message,{theme:"dark"})
          }
          
          toast(data.message,{theme:"dark"})
          navigate('/')
          
        }else{
        toast('Passwords does not match',{theme:"dark"})
        }
        
        } catch (err) {
          console.log("An error occurred while logging in.");
        }
      };
      

  return (
    <div  className='login-box'>
      <ToastContainer />
    <form className='login-form'>
        <h2 className='login'>New Passsowrd</h2>
        <div className="input-box">
        <label htmlFor="password">Password</label>
        <input 
        type={isPassVisible?"text":"password"} 
        required 
        id='password'
        placeholder='password'
        value={newPassword}
        onChange={(e)=>setNewPassword(e.target.value)}
        />
        </div>
        <div className="input-box">
        <label htmlFor="c-password">Confirm Password</label>
        <input 
        type={isPassVisible?"text":"password"} 
        required 
        id='c-password'
        placeholder='password'
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        </div>

        <div className="checkbox">
        <input type="checkbox" name="show-password" id="show-password" checked={isPassVisible} onChange={(e)=>setIsPassVisible(!isPassVisible)}/>
        <label htmlFor="show-password">Show Password</label>
        </div>

        <button type='submit' onClick={(e)=>handleUpdatePassword(e)}>Submit</button>
      </form>
      </div>
  )
}

export default UpdatePassword
