import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = async (employeeId) => {
    try {
      await axios.delete(`/api/employees/${employeeId}`);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const openModal = (employee = null) => {
    setEditData(employee);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData && editData.employeeId) {
        await axios.put(`/api/employees/${editData.employeeId}`, editData);
      } else {
        await axios.post('/api/employees', editData);
      }
      fetchEmployees();
      closeModal();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  return (
    <div className="Grid-box">
      <Nav />
      <SideNav />
      <main id="Employee">
        <div className="container mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>Employee List</h3>
            <div className="d-flex align-items-center">
              <div className="input-group me-3">
                <span className="input-group-text">
                  <FiSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <button className="btn btn-primary" onClick={() => openModal()}>
                <IoAddCircleOutline className="me-2" />
                Add New Employee
              </button>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Team</th>
                  <th>Employee ID</th>
                  <th>Telegram ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email ID</th>
                  <th>Mobile No</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees
                  .filter(
                    (e) =>
                      e.firstName.includes(search) ||
                      e.lastName.includes(search)
                  )
                  .map((employee, index) => (
                    <tr key={employee.employeeId}>
                      <td>{index + 1}</td>
                      <td>{employee.team}</td>
                      <td>{employee.employeeId}</td>
                      <td>{employee.telegramId}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.email}</td>
                      <td>{employee.mobile}</td>
                      <td>{employee.status}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => openModal(employee)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(employee.employeeId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {modalOpen && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="modal-dialog" role="document" style={{ maxWidth: '90%', width: '90%' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editData ? 'Edit Employee' : 'Add Employee'}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-wrap">
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Select Role</label>
                        <select
                          name="role"
                          className="form-control"
                          value={editData?.role || ''}
                          onChange={handleChange}
                        >
                          <option>Select Role</option>
                          {/* Add options for roles */}
                        </select>
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Select Team</label>
                        <select
                          name="team"
                          className="form-control"
                          value={editData?.team || ''}
                          onChange={handleChange}
                        >
                          <option>Select Team</option>
                          {/* Add options for teams */}
                        </select>
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Position</label>
                        <input
                          type="text"
                          name="position"
                          className="form-control"
                          value={editData?.position || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Employee ID</label>
                        <input
                          type="text"
                          name="employeeId"
                          className="form-control"
                          value={editData?.employeeId || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          value={editData?.firstName || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          value={editData?.lastName || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Email ID</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={editData?.email || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Mobile No</label>
                        <input
                          type="text"
                          name="mobile"
                          className="form-control"
                          value={editData?.mobile || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 me-3 mb-3">
                        <label className="form-label">Join Date</label>
                        <input
                          type="date"
                          name="joinDate"
                          className="form-control"
                          value={editData?.joinDate || ''}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex-grow-1 mb-3">
                        <label className="form-label">Grade</label>
                        <input
                          type="text"
                          name="grade"
                          className="form-control"
                          value={editData?.grade || ''}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Employee;
