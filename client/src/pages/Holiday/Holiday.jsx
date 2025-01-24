import React, { useState, useEffect, useContext } from "react";
import Loading from "../../components/Loading";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Page from "../../components/Pagination";
import { MyContext } from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Holiday.css";
import HolidayTable from "../../components/Holiday/HolidayTable";

const Holiday = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const { holidays, setHolidays, isLoading, setIsLoading } =
    useContext(MyContext);
  const navigate = useNavigate();

  const refresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/Holiday");
        const data = await response.json();
        setHolidays(data);
        setSearchResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHolidays();
  }, [refreshKey]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() !== "") {
      const filteredHolidays = holidays.filter((holiday) =>
        holiday.name.toLowerCase().includes(value.toLowerCase().trim())
      );
      setSearchResult(filteredHolidays);
    } else {
      setSearchResult(holidays);
    }
  };

  const handleDeleteHoliday = async (id) => {
    const holiday = holidays.find((h) => h._id === id);

    if (window.confirm(`Are you sure you want to delete "${holiday.name}"?`)) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/Holiday/${id}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();
        if (!response.ok) {
          return alert("Failed to delete the holiday.");
        }

        alert(data.message);

        // Update the holidays state to remove the deleted holiday
        const updatedHolidays = holidays.filter(
          (holiday) => holiday._id !== id
        );
        setHolidays(updatedHolidays);
        setSearchResult(updatedHolidays);
      } catch (error) {
        console.error("Error deleting holiday:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="holiday-container">
      {isLoading && <Loading />}

      <div className="main-content">
        <div className="right-box d-flex align-items-center">
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
            className="btn btn-success ms-2"
            onClick={() => navigate("/holiday/add")}
          >
            <IoAddCircleOutline className="add-icon" />
            Add New Holiday
          </button>
        </div>

        <div className="table-outer">
          <div className="table table-responsive">
            <HolidayTable
              holidays={searchResult}
              handleDeleteHoliday={handleDeleteHoliday}
            />
          </div>
        </div>

        {/* Pagination Component */}
        <hr className="pagination-separator" />
        <div className="pagination-wrapper">
          <Page />
        </div>
      </div>
    </div>
  );
};

export default Holiday;
