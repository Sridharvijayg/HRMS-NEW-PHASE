import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const DepartmentTable = ({departments,handleDeleteDepartment}) => {
    const navigate = useNavigate();
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Department</th>
          <th>CreatedAt</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {departments && departments.length > 0 ? (
          departments.map((dep, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{dep.department}</td>
              <td>{new Date(dep.createdAt).toLocaleDateString()}</td>
              <td className="action">
                <BiEditAlt
                  title="Edit"
                  className="action-icon text-success"
                  onClick={() => navigate(`/Department/${dep._id}`)}
                />
                <LuTrash2
                  title="Delete"
                  className="action-icon text-danger"
                  onClick={() => handleDeleteDepartment(dep._id)}
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

export default DepartmentTable;
