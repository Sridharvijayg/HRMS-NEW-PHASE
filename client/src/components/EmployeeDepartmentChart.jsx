import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EmployeeDepartmentChart = ({ employeeData }) => {
  const [departmentData, setDepartmentData] = useState([]);

  // Function to group employees by department and calculate the counts
  const calculateDepartmentData = () => {
    const departmentCounts = employeeData.reduce((acc, employee) => {
      acc[employee.department] = (acc[employee.department] || 0) + 1;
      return acc;
    }, {});

    // Transform data to the format required for the pie chart
    const data = Object.keys(departmentCounts).map(department => ({
      name: department,
      value: departmentCounts[department],
    }));

    setDepartmentData(data);
  };

  useEffect(() => {
    calculateDepartmentData();
  }, [employeeData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Colors for each department

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '400px', maxHeight: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={departmentData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {departmentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeDepartmentChart;
