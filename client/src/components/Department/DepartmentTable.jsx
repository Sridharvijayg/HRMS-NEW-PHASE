import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentTable = ({ departments, handleDeleteDepartment }) => {
  const navigate = useNavigate();

  return (
    <table className="table table-hover ">
      <thead className="thead-light">
        <tr>
          <th>S.No</th>
          <th>Department</th>
          <th>No.of Employees</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {departments && departments.length > 0 ? (
          departments.map((dep, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dep.department}</td>
              <td>{dep.employeesCount}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-3"
                  style={{ height: "36px", width: "90px" }}
                  title="Edit"
                  onClick={() => navigate(`/Department/${dep._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ height: "36px", width: "90px" }}
                  title="Delete"
                  onClick={() => handleDeleteDepartment(dep._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-3">
              <h3 className="text-muted">No Records Found</h3>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepartmentTable;
