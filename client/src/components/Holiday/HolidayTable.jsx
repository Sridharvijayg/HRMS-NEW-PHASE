import React from "react";
import { useNavigate } from "react-router-dom";

const HolidayTable = ({ holidays, handleDeleteHoliday }) => {
  const navigate = useNavigate();

  return (
    <table className="table table-hover">
      <thead className="thead-light">
        <tr>
          <th>S.No</th>
          <th>Name of the Holiday</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {holidays && holidays.length > 0 ? (
          holidays.map((holiday, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{holiday.name && holiday.name.trim() ? holiday.name : "N/A"}</td>
              <td>{holiday.date && holiday.date.trim() ? holiday.date : "N/A"}</td>
              <td>
                <button
                  className="btn btn-sm btn-success me-3"
                  style={{ height: "36px", width: "90px" }}
                  title="Edit"
                  onClick={() => navigate(`/Holiday/${holiday._id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ height: "36px", width: "90px" }}
                  title="Delete"
                  onClick={() => handleDeleteHoliday(holiday._id)}
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

export default HolidayTable;
