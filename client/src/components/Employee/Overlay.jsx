import React, { useContext } from 'react';
import '../../styles/overlay.css'
import { LuTrash2 } from "react-icons/lu";
import { GlobalContext } from '../../Context/GlobalContext';

const Overlay = () => {

  const {handleCancelDelete,handleDelete,showOverlay} = useContext(GlobalContext);

  return (
    <>
       {showOverlay && (
          <div className="overlay">
            <div className="confirmation-popup">
              <LuTrash2 className='popup-icon text-center text-primary' />
              <p>Are you sure you want to delete</p>
              <div className="confirmation-buttons">
                <button onClick={handleCancelDelete} className="cancel-btn">Cancel</button>
                <button onClick={handleDelete} className="submit-btn">Yes</button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default Overlay
