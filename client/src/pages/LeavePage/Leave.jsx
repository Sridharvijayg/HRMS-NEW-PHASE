

import React, { useEffect, useState, useContext } from "react";
import "../../styles/LeaveApproval.css";
import { FiSearch } from "react-icons/fi";
import { MyContext } from "../../context/MyContext";
import Nav from "../../components/Nav";
import SideNav from "../../components/SideNav";
import Loading from "../../components/Loading";
import LeaveTable from "../../components/Leave/LeaveTable";
import Page from "../../components/Pagination";

const Leave = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [leaves, setLeaves] = useState(null);
  const { isLoading, setIsLoading, isOpen } = useContext(MyContext);
  const [searchResult, setSearchResult] = useState(null);
  const [searchInput, setSearchInput] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [employeeName, setEmployeeName] = useState(""); // Input state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/leaves?page=1&limit=10"
        );
        const data = await response.json();
        setLeaves(data.leaves);
        setSearchResult(data.leaves);
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
      const filteredLeaves = leaves.filter(
        (leave) =>
          leave.name.toLowerCase().includes(value.toLowerCase().trim()) ||
          String(leave.employeeId).trim().includes(value.trim())
      );
      setSearchResult(filteredLeaves);
    } else {
      setSearchResult(leaves);
    }
  };

  const handleApproveSelected = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleApprove = () => {
    alert(`Leave application for ${employeeName} approved!`);
    closeModal();
  };

  const handleReject = () => {
    alert(`Leave application for ${employeeName} rejected!`);
    closeModal();
  };

  return (
    <div className={isOpen ? "Grid-box active" : "Grid-box"}>
      {isLoading && <Loading />}
      <SideNav />
      <Nav />
      {/* Add a blurred background when modal is open */}
      <main id="Employee" className={isModalOpen ? "blur-background" : ""}>
        <div className={isOpen ? "main-header active" : "main-header"}>
          <h5 className="fw-bold">Leave Approvals</h5>
          <div className="right-box">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="search form-control"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearchChange}
              />
            </div>
            <button
              className="btn btn-primary ms-2"
              onClick={handleApproveSelected}
            >
              Approve Selected
            </button>
          </div>
        </div>
        <div className="table-outer">
          <div className="table table-responsive">
            <LeaveTable leaves={searchResult} />
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
            <h4>Leave Application</h4>
            <div className="modal-body">
              <p className="text-bold">Date</p>
              <div className="form-group">
                <div className="form-row">
                  <label htmlFor="fromDate" className="form-label">
                    From:
                  </label>
                  <input
                    type="date"
                    id="fromDate"
                    className="form-input form-control"
                    placeholder="Select date"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="toDate" className="form-label">
                    To:
                  </label>
                  <input
                    type="date"
                    id="toDate"
                    className="form-input form-control"
                    placeholder="Select date"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="employeeName" className="form-label">
                    Employee Name:
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    className="form-input form-control"
                    placeholder="Enter employee name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="team" className="form-label">
                    Team:
                  </label>
                  <input
                    type="text"
                    id="team"
                    className="form-input form-control"
                    placeholder="Enter team name"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="comments" className="form-label">
                    Comments:
                  </label>
                  <input
                    type="text"
                    id="comments"
                    className="form-input form-control"
                    placeholder="Enter comments"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="rejectReason" className="form-label">
                    Reject Reason:
                  </label>
                  <input
                    type="text"
                    id="rejectReason"
                    className="form-input form-control"
                    placeholder="Enter reason"
                  />
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button className="btn btn-danger" onClick={handleReject}>
                Reject
              </button>
              <button className="btn btn-primary" onClick={handleApprove}>
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
