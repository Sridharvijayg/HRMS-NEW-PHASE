import React, { useContext, useState } from "react";
import '../styles/ToggleButton.css'
import { MyContext } from "../context/MyContext";

const CheckInOutToggle = () => {
  const { isCheckedIn, handleToggles } = useContext(MyContext);

  return (
    <div>
      <button onClick={handleToggles} className={`toggle-button ${isCheckedIn ? 'checked' : ''}`}>
        <span className="toggle-text">
          {isCheckedIn ? "Check-out" : "Check-in"}
        </span>
        <div className={`toggle-indicator ${isCheckedIn ? 'active' : ''}`}></div>
      </button>
    </div>
  );
};

export default CheckInOutToggle;
