import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import TableComponent from "./TableComponent";
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newJoiners, setNewJoiners] = useState([]);
  const [exitEmployees, setExitEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees");
        const data = await response.json();
        setEmployees(data);
        setNewJoiners(data.filter((emp) => emp.isNewJoiner));
        setExitEmployees(data.filter((emp) => emp.hasExited));
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []);

  const teamLabels = ["Android", "FE", "Interns", "HR", "QA", "Backend"];
  const teamData = [12, 18, 5, 9, 7, 10];

  const tableColumns = [
    { header: "Name", accessor: "name" },
    { header: "Employee ID", accessor: "employeeId" },
    { header: "Team", accessor: "team" },
    { header: "Date of Joining", accessor: "dateOfJoining" },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg-light vh-100 p-0">
          <SideNav />
        </div>
        <div className="col-10 p-0">
          <Nav />
          <div className="container mt-3">
              {/* Top Section */}
                  <div className="card bg-success text-white mb-3 p-3">
                  <h4 className="mb-1">Hi, suresh 👋</h4>
                  <p className="mb-0">Good to see you again!</p>
                  </div>


            {/* Statistics Cards */}
            <div className="row mb-3">
              {[
                { title: "Total Employees", value: 257 },
                { title: "Attendance Report", value: "98%" },
                { title: "Leaves Today", value: 3 },
                { title: "Departments", value: 15 },
              ].map((stat, index) => (
                <div className="col-sm-3 mb-3" key={index}>
                  <div className="card text-center p-2 bg-white border-0 shadow-sm">
                    <h6>{stat.title}</h6>
                    <h4 className="mb-0">{stat.value}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="card mb-3 p-3">
              <h6 className="mb-2">Teams</h6>
              <BarChart data={teamData} labels={teamLabels} width="900px" height="300px" />
            </div>

            {/* Tables Section */}
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-3 p-3">
                  <TableComponent
                    title="New Joiners List"
                    data={newJoiners}
                    columns={tableColumns}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-3 p-3">
                  <TableComponent
                    title="Exit Employee List"
                    data={exitEmployees}
                    columns={tableColumns}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
