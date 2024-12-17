import React, { useEffect, useState, useContext } from "react";
import "../../styles/employee.css";
import { FiSearch } from "react-icons/fi";
import { MyContext } from "../../context/MyContext";
import Nav from "../../components/Nav";
import SideNav from "../../components/SideNav";
import Loading from "../../components/Loading";
import LeaveTable from "../../components/Leave/LeaveTable";

const Leave = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [leaves, setLeaves] = useState(null);
  const { isLoading, setIsLoading, isOpen } = useContext(MyContext);
  const [searchResult,setSearchResult]= useState(null);
  const [searchInput,setSearchInput]= useState(null);

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
      const filteredLeaves = leaves.filter((leave) =>
        leave.name.toLowerCase().includes(value.toLowerCase().trim()) ||
        String(leave.employeeId).trim().includes(value.trim())
      );
      setSearchResult(filteredLeaves);
    } else {
      setSearchResult(leaves);
    }
  };


  return (
    <div className={isOpen ? "Grid-box active" : "Grid-box"}>
      {isLoading && <Loading />}
      <SideNav />
      <Nav />
      <main id="Employee">
        <div className={isOpen ? "main-header active" : "main-header"}>
          <h3 className="fw-bold">Leave</h3>
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
          </div>
        </div>
        <div className="table-outer">
          <div className="table table-responsive">
            <LeaveTable leaves={searchResult} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leave;
