import React from "react";

const DiagnosticTable = ({ diagnoses }) => {
  // التحقق من وجود بيانات للتشخيصات
  if (!diagnoses || diagnoses.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>No diagnostic records found.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <h2 className="text-xl font-bold mb-4 text-slate-800">Diagnostic List</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-600 border-b">
              <th className="pb-3 font-medium">Problem/Diagnosis</th>
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {diagnoses.map((diagnosis, index) => (
              <tr
                key={index} // استخدام index كـ fallback في حالة عدم وجود id
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 text-slate-800">{diagnosis.name}</td>
                <td className="py-4 text-slate-600">{diagnosis.description}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      diagnosis.status === "Cured"
                        ? "bg-green-100 text-green-800"
                        : diagnosis.status === "Under Observation"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {diagnosis.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiagnosticTable;
