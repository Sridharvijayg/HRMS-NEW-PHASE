import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";

const Title = ({label}) => {
    
  const navigate = useNavigate();
  
  return (
    <div className="title">
          <IoIosArrowBack className="back-btn" onClick={() => navigate(-1)} />
          <h2>{label}</h2>
        </div>
  )
}

export default Title
