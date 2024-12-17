import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/employee.css";
import SideNav from "../../components/SideNav";
import Nav from "../../components/Nav";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { MyContext } from "../../context/MyContext";
import Loading from "../../components/Loading";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Attendance = () => {
  const { isLoading, setIsLoading, isOpen } = useContext(MyContext);
  const [report, setReport] = useState([]);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
  };

  // Format the selected date to YYYY/MM/DD
  const formattedDate = moment(date).format("YYYY-MM-DD");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/Attendance/attendance-report?date=${formattedDate}`
        );
        const data = await response.json();
        setReport(data.attendanceRecords);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [formattedDate]);

  const formatTimeTo12Hour = (isoString) => {
    // Create a new Date object from the ISO string
    const date = new Date(isoString);

    // Extract the hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12; // Convert hour to 12-hour format
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes to always be two digits
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    // Return the formatted time
    return `${hours}:${minutesStr} ${ampm}`;
  };

  // Function to download the table as an Excel file
  const downloadExcel = () => {
    const table = document.getElementById("attendance-table");
    const workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
    toast("Download started", { theme: "dark" });
  };

  return (
    <div className={isOpen ? "Grid-box active" : "Grid-box"}>
      <ToastContainer />
      {isLoading && <Loading />}
      <SideNav />
      <Nav title="Attendance" />
      <main id="Employee">
        <div className={isOpen ? "main-header active" : "main-header"}>
          <h3 className="fw-bold">Attendance</h3>
          <div className="right-box">
            <span className="no-style">
            <DatePicker
              className="datepicker"
              selected={date}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd" // This ensures the date is formatted correctly for display
            />
            </span>
            <button onClick={downloadExcel}>
              <IoCloudDownloadOutline className="add-icon" />
              Download Excel
            </button>
          </div>
        </div>
        <div className="table-outer">
          <div className="table table-responsive">
            <table id="attendance-table">
              <thead className="thead-dark">
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>CheckIn Time</th>
                  <th>Status</th>
                  <th>Working Hours</th>
                </tr>
              </thead>
              <tbody>
                {report && report.length > 0 ? (
                  report.map((rep) => (
                    <tr key={rep._id}>
                      <td>{rep.employeeId}</td>
                      <td>{rep.name}</td>
                      <td>
                        {rep.checkInTimes.length > 0
                          ? formatTimeTo12Hour(rep.checkInTimes[0])
                          : "N/A"}
                      </td>
                      <td>
                        <span
                          id="dotiv"
                          className={
                            rep.status == "CheckIn"
                              ? "approved"
                              : rep.status == "Present"
                              ? "present"
                              : "rejected"
                          }
                        >
                          .
                        </span>
                        <p
                          className={
                            rep.status == "CheckIn"
                              ? "approved"
                              : rep.status == "Present"
                              ? "present"
                              : "rejected"
                          }
                        >
                          {rep.status}
                        </p>
                      </td>
                      <td>{rep.totalWorkHours}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center no-record">
                      <h3 className="text-center">No Records Found</h3>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Attendance;
