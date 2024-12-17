import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const YearPie = ( ) => {

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const departmentData = {
    "2025":100,
    "2024":70,
    "2023":50,
    "2022":60
  }

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
              <Cell key="cell-0" fill={COLORS[0]} />
              <Cell key="cell-1" fill={COLORS[1]} />
              <Cell key="cell-2" fill={COLORS[2]} />
              <Cell key="cell-3" fill={COLORS[3]} />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearPie;
