import React, { useContext, useEffect, useState } from "react";
import Page from "../../components/Pagination";
import SideNav from "../../components/SideNav";
import Nav from "../../components/Nav";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import PayrollTable from "../../components/Payroll/PayrollTable";
import "../../styles/payrollmodel.css";

const Payroll = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const { departments, setDepartments, isLoading, setIsLoading, isOpen } =
    useContext(MyContext);

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  const handleDeleteDepartment = async (id) => {
    const dep = departments.filter((dep) => dep._id === id);

    if (
      window.confirm(
        `You want to delete the department " ${dep[0].department} " Permanantly`
      )
    ) {
      try {
        const PostOption = {
          method: "DELETE",
        };
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/Department/${id}`,
          PostOption
        );
        const data = await response.json();
        if (!response.ok) {
          return alert("err");
        }
        alert(data.message);
        const after = departments.filter((dep) => dep._id !== id);
        setDepartments(after);
        setIsLoading(false);
        setRefreshKey((prev) => prev + 1);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/Department");
        const data = await response.json();
        setDepartments(data);
        setSearchResult(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      const filteredDepartments = departments.filter((dep) =>
        dep.department.toLowerCase().includes(value.toLowerCase().trim())
      );
      setSearchResult(filteredDepartments);
    } else {
      setSearchResult(departments);
    }
  };
  const handleItem = () => {
    setIsModalOpen(true); // Open the modal
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={isOpen ? "Grid-box active" : "Grid-box"}>
      {isLoading && <Loading />}
      <SideNav />
      <Nav title="Payroll" />
      <main id="Employee">
        <div className={isOpen ? "main-header active" : "main-header"}>
          <h5 className="fw-bold">Payroll</h5>
          <div className="right-box d-flex align-items-center">
            <div className="search-container flex-grow-1">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search form-control"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>

            <button className="btn btn-primary ms-2" onClick={handleItem}>
              <IoAddCircleOutline className="add-icon" />
              Approve Selected
            </button>
          </div>
        </div>

        <div className="table-outer">
          <div className="table table-responsive">
            <PayrollTable departments={searchResult} />
          </div>
        </div>

        {/* Add Pagination Component */}

        <hr className="pagination-separator" />

        <div className="pagination-wrapper">
          <Page />
        </div>
      </main>

      {/* Custom Modal */}
      {isModalOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h5>Add Salary Item</h5>
            <button className="close-modal-btn" onClick={handleCloseModal}>
              &times; {/* This represents the 'X' close icon */}
            </button>
            <div className="modal-body">
              <div className="form-group">
                <div className="form-row">
                  <label htmlFor="fromDate" className="form-label">
                    Seletct Role
                  </label>
                  <input
                    type="text"
                    id="fromDate"
                    className="form-input form-control"
                    placeholder="Select Role"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="toDate" className="form-label">
                    Select Team
                  </label>
                  <input
                    type="text"
                    id="toDate"
                    className="form-input form-control"
                    placeholder="Select Team"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="employeeName" className="form-label">
                    Select Leave Policy
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    className="form-input form-control"
                    placeholder=" Select Leave Policy"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="team" className="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    id="team"
                    className="form-input form-control"
                    placeholder="Employee ID"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="comments" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="comments"
                    className="form-input form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rejectReason" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="rejectReason"
                    className="form-input form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rejectReason" className="form-label">
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="rejectReason"
                    className="form-input form-control"
                    placeholder="Email ID"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rejectReason" className="form-label">
                    Mobile No
                  </label>
                  <input
                    type="number"
                    id="rejectReason"
                    className="form-input form-control"
                    placeholder="Mobile No"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rejectReason" className="form-label">
                    Join Date
                  </label>
                  <input
                    type="date"
                    id="rejectReason"
                    className="form-input form-control"
                    placeholder="Join Date"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rejectReason" className="form-label">
                    Salary
                  </label>
                  <input
                    type="number"
                    id="rejectReason"
                    className="form-input form-control"
                    placeholder="Salary"
                  />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary">Cancel</button>

              <button className="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
