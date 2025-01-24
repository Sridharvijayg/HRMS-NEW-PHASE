import React from "react";
import "../../styles/LeaveApproval.css";



const LeaveDetailsModal = ({ isOpen, leave, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h5>Leave Details</h5>
        <p><strong>Name:</strong> {leave.name}</p>
        <p><strong>Employee ID:</strong> {leave.employeeId}</p>
        <p><strong>Start Date:</strong> {leave.startDate}</p>
        <p><strong>End Date:</strong> {leave.endDate}</p>
        <p><strong>Reason:</strong> {leave.reason}</p>
        {/* Add more details as needed */}
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LeaveDetailsModal;
