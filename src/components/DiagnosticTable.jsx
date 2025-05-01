import React, { useEffect, useState } from "react";

const DiagnosticTable = ({ diagnoses }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  // Check if there are more than 3 rows to show scrollbar
  useEffect(() => {
    if (diagnoses && diagnoses.length > 3) {
      setShowScrollbar(true);
    } else {
      setShowScrollbar(false);
    }
  }, [diagnoses]);

  // Toggle row expansion for mobile view
  const toggleRowExpansion = (index) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);
    }
  };

  // Check if diagnostic data exists
  if (!diagnoses || diagnoses.length === 0) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm">
        <p className="text-gray-500 font-medium">
          No diagnostic records found.
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Patient has no diagnostic history.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Diagnostic List</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {diagnoses.length} {diagnoses.length === 1 ? "record" : "records"}
        </span>
      </div>

      {/* Table container with conditional max height and scrollbar */}
      <div
        className={`overflow-x-auto rounded-lg border border-gray-100 ${
          showScrollbar ? "overflow-y-auto" : "overflow-y-hidden"
        }`}
        style={{
          maxHeight: showScrollbar ? "250px" : "none",
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db transparent",
        }}
      >
        <table className="w-full min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-3 font-medium">Problem/Diagnosis</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">
                Description
              </th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {diagnoses.map((diagnosis, index) => (
              <React.Fragment key={index}>
                <tr
                  className="hover:bg-gray-50 transition-colors cursor-pointer md:cursor-default"
                  onClick={() => toggleRowExpansion(index)}
                >
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">
                    {diagnosis.name}
                    <span className="md:hidden ml-2 text-gray-400 text-xs">
                      {expandedRow === index ? "▲" : "▼"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                    {diagnosis.description}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        diagnosis.status === "Cured"
                          ? "bg-green-100 text-green-800"
                          : diagnosis.status === "Under Observation"
                          ? "bg-amber-100 text-amber-800"
                          : diagnosis.status === "Active"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {diagnosis.status}
                    </span>
                  </td>
                </tr>
                {/* Mobile description row (expandable) */}
                {expandedRow === index && (
                  <tr className="md:hidden bg-gray-50">
                    <td
                      colSpan={3}
                      className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100"
                    >
                      <div className="font-medium text-xs text-gray-500 mb-1">
                        Description:
                      </div>
                      {diagnosis.description}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view help text */}
      <div className="md:hidden mt-4">
        <p className="text-xs text-gray-500 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Tap on a diagnosis to view its full description
        </p>
      </div>
    </div>
  );
};

export default DiagnosticTable;
