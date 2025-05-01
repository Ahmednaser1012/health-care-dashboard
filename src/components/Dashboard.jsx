import { useSelector } from "react-redux";
import PatientInfo from "./PatientInfo";
import VitalSigns from "./VitalSigns";
import BloodPressureChart from "./BloodPressureChart";
import { useState, useEffect } from "react";
import LabResults from "./LabResults";
import DiagnosticTable from "./DiagnosticTable";

const Dashboard = () => {
  const { selectedPatient, status, error } = useSelector(
    (state) => state.patients
  );
  console.log(selectedPatient);

  const [bloodPressureData, setBloodPressureData] = useState();
  const [labResultsData, setLabResultsData] = useState([]);
  const [diagnosticData, setDiagnosticData] = useState([]);

  // Process all patient data in a single useEffect to avoid race conditions
  useEffect(() => {
    if (!selectedPatient) return;

    console.log("Selected patient data:", selectedPatient);

    // Process blood pressure data
    if (
      selectedPatient?.diagnosis_history &&
      selectedPatient.diagnosis_history.length > 0
    ) {
      try {
        const bpData = selectedPatient.diagnosis_history.map((item) => {
          return {
            date: `${item.month}-${item.year}`,
            systolic: item.blood_pressure.systolic.value,
            diastolic: item.blood_pressure.diastolic.value,
            heartRate: item.heart_rate.value,
            respiratoryRate: item.respiratory_rate.value,
            temperature: item.temperature.value,
          };
        });
        setBloodPressureData(bpData);
        console.log("Blood pressure data from diagnosis history:", bpData);
      } catch (error) {
        console.error("Error processing diagnosis history:", error);
      }
    } else if (selectedPatient?.vitalSigns?.bloodPressure?.history) {
      // Fallback to use the vitalSigns data structure if available
      setBloodPressureData(selectedPatient.vitalSigns.bloodPressure.history);
      console.log(
        "Using vitalSigns blood pressure history:",
        selectedPatient.vitalSigns.bloodPressure.history
      );
    } else {
      console.log("No blood pressure data found in patient record");
      setBloodPressureData([]);
    }

    // Process lab results data
    if (
      selectedPatient?.lab_results &&
      selectedPatient.lab_results.length > 0
    ) {
      try {
        const labData = selectedPatient.lab_results.map((item) => {
          return {
            labTest: item, // Test name only
            result: "Result not available", // Fixed value for missing result
          };
        });
        setLabResultsData(labData);
        console.log("Lab results data:", labData);
      } catch (error) {
        console.error("Error processing lab results:", error);
        setLabResultsData([]);
      }
    } else {
      setLabResultsData([]);
    }

    // Process diagnostic data
    if (
      selectedPatient?.diagnostic_list &&
      selectedPatient.diagnostic_list.length > 0
    ) {
      try {
        const diagData = selectedPatient.diagnostic_list.map((item) => {
          return {
            name: item.name,
            description: item.description,
            status: item.status,
          };
        });
        setDiagnosticData(diagData);
        console.log("Diagnostic data:", diagData);
      } catch (error) {
        console.error("Error processing diagnostic data:", error);
        setDiagnosticData([]);
      }
    } else if (
      selectedPatient?.diagnosis_history &&
      selectedPatient.diagnosis_history.length > 0 &&
      selectedPatient.diagnosis_history[
        selectedPatient.diagnosis_history.length - 1
      ]?.diagnostic_list
    ) {
      // Try to get diagnostic data from the latest diagnosis history entry
      try {
        const latestDiagnosis =
          selectedPatient.diagnosis_history[
            selectedPatient.diagnosis_history.length - 1
          ];
        const diagData = latestDiagnosis.diagnostic_list.map((item) => {
          return {
            name: item.name,
            description: item.description,
            status: item.status,
          };
        });
        setDiagnosticData(diagData);
        console.log("Diagnostic data from history:", diagData);
      } catch (error) {
        console.error("Error processing diagnostic data from history:", error);
        setDiagnosticData([]);
      }
    } else {
      setDiagnosticData([]);
    }
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
          <BloodPressureChart bloodPressureData={bloodPressureData} />
          {/* Vital Signs Cards */}
          {selectedPatient?.diagnosis_history &&
          selectedPatient.diagnosis_history.length > 0 ? (
            <VitalSigns
              vitalSigns={
                selectedPatient.diagnosis_history[
                  selectedPatient.diagnosis_history.length - 1
                ]
              }
            />
          ) : selectedPatient?.vitalSigns ? (
            <VitalSigns vitalSigns={selectedPatient.vitalSigns} />
          ) : (
            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-500">No vital signs data available</p>
            </div>
          )}
        </div>
        {/* Diagnostic Table */}
        <div className="mt-5 mb-8">
          <DiagnosticTable diagnoses={diagnosticData} />
        </div>
      </div>

      {/* Right column - Patient information */}
      <div className="lg:col-span-1 space-y-6">
        <PatientInfo patient={selectedPatient} />
        <LabResults
          labTests={
            labResultsData.length > 0
              ? labResultsData
              : selectedPatient?.lab_results || []
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
