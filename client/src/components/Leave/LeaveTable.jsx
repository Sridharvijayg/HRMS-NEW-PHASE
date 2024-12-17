import React from "react";
import '../../styles/employee.css'
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const DepartmentTable = ({leaves}) => {
    const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th>Employee Id</th>
          <th>Name</th>
          <th>From</th>
          <th>To</th>
          <th>No.of.Days</th>
          <th>Remaining</th>
          <th>status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        { leaves && leaves.length>0 ?
            leaves.map((leave) => (
                <tr key={leave._id}>
                <td>{leave.employeeId}</td>
                <td>{leave.name}</td>
                <td>{leave.fromDate.split('T')[0]}</td>
                <td>{leave.toDate.split('T')[0]}</td>
                <td>{leave.noOfDays}</td>
                <td>{leave.remainingDays}</td>
                <td><span id="dotiv" className={leave.status == "Approved" ?"approved":leave.status == "Pending"?"pending":"rejected"}>.</span><p className={leave.status == "Approved" ?"approved":leave.status == "Pending"?"pending":"rejected"}>{leave.status}</p></td>
                <td className="action">
                    <BiEditAlt
                    title="Edit"
                    className="action-icon text-success"
                    onClick={()=>navigate(`/leave/${leave.leaveId}`)}
                    />
                   
                </td>
                </tr>
            )): (
          <tr>
            <td colSpan="8" className="text-center no-record">
              <h3 className="text-center">No Records Found</h3>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
