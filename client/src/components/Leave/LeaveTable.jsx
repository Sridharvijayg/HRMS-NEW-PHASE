

import React from "react";
import "../../styles/employee.css";
import { BiEditAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Leavetable.css";


const DepartmentTable = ({ leaves }) => {
  const navigate = useNavigate();
  return (
    <table className="table table-hover">
      <thead className="thead-light">
        <tr>
          <th>All</th> 
          <th>S.No</th> 
          {/* <th>Employee Id</th>
          <th>Name</th> */}
          <th>From</th>
          <th>To</th>
          <th>No.of.Days</th>
          <th>Remaining</th>
          <th>Status</th>
          <th>Project</th> 
          <th>Leave Approved By</th> 
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {leaves && leaves.length > 0 ? (
          leaves.map((leave, index) => (
            <tr key={leave._id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{index + 1}</td> {/* Serial Number */}
              {/* <td>{leave.employeeId}</td>
                  <td>{leave.name}</td> */}
              <td>{leave.fromDate.split("T")[0]}</td>
              <td>{leave.toDate.split("T")[0]}</td>
              <td>{leave.noOfDays}</td>
              <td>{leave.remainingDays}</td>
              <td>
                <span
                  id="dotiv"
                  className={
                    leave.status === "Approved"
                      ? "approved"
                      : leave.status === "Pending"
                      ? "pending"
                      : "rejected"
                  }
                ></span>
                <p
                  className={
                    leave.status === "Approved"
                      ? "approved"
                      : leave.status === "Pending"
                      ? "pending"
                      : "rejected"
                  }
                >
                  {leave.status}
                </p>
              </td>
              <td>{leave.project}</td> 
              <td>{leave.leaveApprovedBy}</td> 
              {/* <td className="action">
                    <BiEditAlt
                      title="Edit"
                      className="action-icon text-success"
                      onClick={() => navigate(`/leave/${leave.leaveId}`)}
                    />
                  </td> */}
              <td>
                <Link className="Vlink" to=''>View</Link>
                {/* <button className="vbutton">View</button> */}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="12" className="text-center no-record">
              <h3 className="text-center">No Records Found</h3>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
