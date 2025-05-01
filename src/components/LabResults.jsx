import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";

const LabResults = ({ labTests }) => {
  const [showScrollbar, setShowScrollbar] = useState(false);

  // Check if there are more than 5 rows to show scrollbar
  useEffect(() => {
    if (labTests && labTests.length > 5) {
      setShowScrollbar(true);
    } else {
      setShowScrollbar(false);
    }
  }, [labTests]);

  // Check if data is empty
  if (!labTests || labTests.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-gray-500 font-medium">No lab results available.</p>
        <p className="text-gray-400 text-sm mt-1">
          Patient has no lab tests on record.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Lab Results</h2>
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {labTests.length} {labTests.length === 1 ? "test" : "tests"}
        </span>
      </div>

      {/* Container with conditional scrollbar */}
      <div
        className={`${
          showScrollbar ? "overflow-y-auto" : "overflow-y-hidden"
        } rounded-lg border border-gray-100`}
        style={{
          maxHeight: showScrollbar ? "300px" : "none",
          scrollbarWidth: "thin",
          scrollbarColor: "#d1d5db transparent",
        }}
      >
        <div className="flex flex-col divide-y divide-gray-100">
          {labTests.map((test, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <span className="text-gray-800 font-medium">
                  {typeof test === "object" && test.labTest
                    ? test.labTest
                    : typeof test === "string"
                    ? test
                    : "Unknown test"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-3 hidden sm:inline-block">
                  {typeof test === "object" && test.result
                    ? test.result
                    : "Result not available"}
                </span>
                <button className="text-gray-400 hover:text-blue-500 transition-colors p-1 rounded-full hover:bg-blue-50">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show message when scrollable */}
      {showScrollbar && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Scroll to see more lab results
          </p>
        </div>
      )}
    </div>
  );
};

export default LabResults;
