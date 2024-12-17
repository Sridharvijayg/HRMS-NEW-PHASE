import React from "react";
import profile from "../../assets/image/profile.jpg";
import { IoEyeOutline } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Table = ({ searchResult,handleDelete}) => {
    const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th>Profile</th>
          <th>Id</th>
          <th>Name</th>
          <th>email</th>
          <th>Department</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((emp, index) => (
            <tr key={index}>
              <td>
                <img
                  src={
                    emp.profilePictureUrl ? emp.profilePictureUrl : profile
                  }
                  alt={emp.name}
                />
              </td>
              <td>{emp.employeeId}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td className="action">
                <IoEyeOutline
                  title="View"
                  className="action-icon text-primary"
                  onClick={() => navigate(`/employee/view/${emp.employeeId}`)}
                />
                <BiEditAlt
                  title="Edit"
                  className="action-icon text-success"
                  onClick={() => navigate(`/employee/${emp.employeeId}`)}
                />
                <LuTrash2
                  title="Delete"
                  className="action-icon text-danger"
                  onClick={() => handleDelete(emp.employeeId)}
                />
              </td>
            </tr>
          ))
        ) : (
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

export default Table;
