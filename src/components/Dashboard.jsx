import { useSelector } from "react-redux";
import PatientInfo from "./PatientInfo";
import VitalSigns from "./VitalSigns";
import BloodPressureChart from "./BloodPressureChart";
import { useState, useEffect } from "react";
import DiagnosticTable from "./DiagnosticTable";
import LabResults from "./LabResults";

const Dashboard = () => {
  const { selectedPatient, status, error } = useSelector(
    (state) => state.patients
  );
  console.log(selectedPatient);

  const [bloodPressureData, setBloodPressureData] = useState();

  useEffect(() => {
    const data = selectedPatient?.diagnosis_history.map((item) => {
      return {
        date: `${item.month}-${item.year}`,
        systolic: item.blood_pressure.systolic.value,
        diastolic: item.blood_pressure.diastolic.value,
        heartrate: item.heart_rate.value,
        respiratoryRate: item.respiratory_rate.value,
        temperature: item.temperature.value,
      };
    });

    setBloodPressureData(data);
  }, [selectedPatient]);

  useEffect(() => {
    const data = selectedPatient?.lab_results.map((item) => {
      return {
        labTest: item, // اسم الفحص فقط
        result: "Result not available", // قيمة ثابتة لعدم وجود النتيجة
      };
    });
    setBloodPressureData(data);
  }, [selectedPatient]);

  useEffect(() => {
    const data = selectedPatient?.diagnostic_list.map((item) => {
      return {
        name: item.name,
        description: item.description,
        status: item.status,
      };
    });
    setBloodPressureData(data);
  }, [selectedPatient]);

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Handle error state
  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="text-red-500 text-xl mb-2">Error loading data</div>
        <p className="text-gray-600">{error || "Please try again later"}</p>
        <button className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
          Retry
        </button>
      </div>
    );
  }

  // Handle no patient selected
  if (!selectedPatient) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="text-gray-500 text-xl mb-2">No patient selected</div>
        <p className="text-gray-600">
          Please select a patient from the sidebar
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Charts and vital signs */}
      <div className="lg:col-span-2 space-y-6">
        {/* Diagnosis History section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Diagnosis History
          </h2>

          {/* Blood Pressure Chart */}
          <BloodPressureChart
            // bloodPressureData={
            //     selectedPatient?.vitalSigns?.bloodPressure?.history
            // }
            bloodPressureData={bloodPressureData}
          />
          {/* Vital Signs Cards */}
          <VitalSigns
            vitalSigns={
              selectedPatient?.diagnosis_history[
                selectedPatient?.diagnosis_history.length - 1
              ]
            }
          />

          {/* <DiagnosticTable
            diagnoses={
              selectedPatient?.diagnosis_history[
                selectedPatient?.diagnosis_history.length - 1
              ]?.diagnostic_list || []
            }
          /> */}
        </div>
      </div>

      {/* Right column - Patient information */}
      <div className="lg:col-span-1 space-y-6">
        <PatientInfo patient={selectedPatient} />
        <LabResults labTests={selectedPatient?.lab_results || []} />
      </div>
    </div>
  );
};

export default Dashboard;
