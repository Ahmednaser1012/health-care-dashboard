import React from "react";
import { Download } from "lucide-react";

const LabResults = ({ labTests }) => {
  // التحقق إذا كانت البيانات فارغة
  if (!labTests || labTests.length === 0) {
    return <div>No lab results available.</div>;
  }

  return (
    // <div className="table-container">
    //   <h2 className="text-xl font-bold mb-4 text-slate-800">Lab Results</h2>
    //   <div className="flex flex-col">
    //     {labTests.map((test, index) => (
    //       <div
    //         key={index}
    //         className="lab-result-card flex items-center space-x-4"
    //       >
    //         {/* عرض اسم الفحص بجانب الأيقونة */}
    //         <span className="text-slate-700">{test}</span>
    //         <button className="text-slate-600 hover:text-primary">
    //           <Download size={20} />
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="table-container bg-white p-4 rounded-lg shadow-sm ">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Lab Results</h2>
      <div className="flex flex-col justify-between  space-y-4">
        {labTests.map((test, index) => (
          <div
            key={index}
            className=" flex items-center justify-between space-x-4"
          >
            <span className="text-slate-700 overflow-hidden">{test}</span>
            <button className="text-slate-600 hover:text-primary">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;
