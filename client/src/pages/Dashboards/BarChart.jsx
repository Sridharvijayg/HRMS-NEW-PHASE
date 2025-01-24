import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, labels, width, height }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Employees",
        data: data,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8E44AD",
          "#2ECC71",
          "#3498DB",
          "#E74C3C",
          "#34495E",
          "#95A5A6",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio to allow custom sizing
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: width || '200px', height: height || '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
