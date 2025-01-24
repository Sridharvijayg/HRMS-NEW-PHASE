import React from "react";

const TableComponent = ({ title, data = [], columns = [] }) => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 mt-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="text-left border-b border-gray-200 px-4 py-2"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="border-b border-gray-200 px-4 py-2"
                  >
                    {row[col.accessor] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableComponent;
