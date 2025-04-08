import { useSelector } from "react-redux";
import PatientInfo from "./PatientInfo";
import VitalSigns from "./VitalSigns";
import BloodPressureChart from "./BloodPressureChart";

const Dashboard = () => {
  const { selectedPatient, status, error } = useSelector(
    (state) => state.patients
  );

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
            bloodPressureData={selectedPatient.vitalSigns.bloodPressure.history}
          />
          {/* Vital Signs Cards */}
          <VitalSigns vitalSigns={selectedPatient.vitalSigns} />
        </div>
      </div>

      {/* Right column - Patient information */}
      <div className="lg:col-span-1">
        <PatientInfo patient={selectedPatient} />
      </div>
    </div>
  );
};

export default Dashboard;

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import PatientInfo from "./PatientInfo";
// import VitalSigns from "./VitalSigns";
// import BloodPressureChart from "./BloodPressureChart";
// import { fetchPatientDetails } from "../redux/patientSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { selectedPatient, detailsStatus, detailsError } = useSelector(
//     (state) => state.patients
//   );

//   // جلب بيانات المريض إذا لم تكن موجودة
//   useEffect(() => {
//     if (
//       selectedPatient &&
//       (!selectedPatient.vitalSigns || detailsStatus === "idle")
//     ) {
//       dispatch(fetchPatientDetails(selectedPatient.id));
//     }
//   }, [dispatch, selectedPatient, detailsStatus]);

//   // حالة عدم وجود مريض محدد
//   if (!selectedPatient) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-center">
//         <div className="text-gray-500 text-xl mb-2">No patient selected</div>
//         <p className="text-gray-600">
//           Please select a patient from the sidebar
//         </p>
//       </div>
//     );
//   }

//   // حالة التحميل
//   if (detailsStatus === "loading") {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   // حالة الخطأ
//   if (detailsStatus === "failed") {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-center">
//         <div className="text-red-500 text-xl mb-2">Error loading data</div>
//         <p className="text-gray-600">{detailsError || "Unknown error"}</p>
//         <button
//           className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
//           onClick={() => dispatch(fetchPatientDetails(selectedPatient.id))}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   // التأكد من وجود vitalSigns قبل العرض
//   if (!selectedPatient.vitalSigns) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       {/* Left column - Charts and vital signs */}
//       <div className="lg:col-span-2 space-y-6">
//         {/* Diagnosis History section */}
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-800 mb-4">
//             Diagnosis History
//           </h2>
//           <BloodPressureChart
//             bloodPressureData={
//               selectedPatient.vitalSigns.bloodPressure?.history || []
//             }
//           />
//         </div>

//         {/* Vital Signs Cards */}
//         <VitalSigns vitalSigns={selectedPatient.vitalSigns} />
//       </div>

//       {/* Right column - Patient information */}
//       <div className="lg:col-span-1">
//         <PatientInfo patientId={selectedPatient.id} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import PatientInfo from "./PatientInfo";
// import VitalSigns from "./VitalSigns";
// import BloodPressureChart from "./BloodPressureChart";
// import { fetchPatientDetails } from "../redux/users/usersSlice";

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const { selectedPatient, detailsStatus, detailsError } = useSelector(
//     (state) => state.patients
//   );

//   useEffect(() => {
//     if (
//       selectedPatient &&
//       !selectedPatient.vitalSigns &&
//       detailsStatus === "idle"
//     ) {
//       dispatch(fetchPatientDetails(selectedPatient.id));
//     }
//   }, [dispatch, selectedPatient, detailsStatus]);

//   if (!selectedPatient) return <Message text="No patient selected" />;
//   if (detailsStatus === "loading") return <Loading />;
//   if (detailsStatus === "failed")
//     return (
//       <ErrorMessage
//         error={detailsError}
//         retry={() => dispatch(fetchPatientDetails(selectedPatient.id))}
//       />
//     );
//   if (!selectedPatient.vitalSigns) return <Loading />;

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//       <div className="lg:col-span-2 space-y-6 bg-white p-4 rounded-lg shadow-sm">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Diagnosis History
//         </h2>
//         <BloodPressureChart
//           bloodPressureData={
//             selectedPatient.vitalSigns.bloodPressure?.history || []
//           }
//         />
//         <VitalSigns vitalSigns={selectedPatient.vitalSigns} />
//       </div>
//       <div className="lg:col-span-1">
//         <PatientInfo patientId={selectedPatient.id} />
//       </div>
//     </div>
//   );
// };

// const Message = ({ text }) => (
//   <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
//     <p className="text-xl">{text}</p>
//   </div>
// );

// const Loading = () => (
//   <div className="flex items-center justify-center h-full">
//     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
//   </div>
// );

// const ErrorMessage = ({ error, retry }) => (
//   <div className="flex flex-col items-center justify-center h-full text-center">
//     <p className="text-red-500 text-xl mb-2">Error loading data</p>
//     <p className="text-gray-600">{error || "Unknown error"}</p>
//     <button
//       className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
//       onClick={retry}
//     >
//       Retry
//     </button>
//   </div>
// );

// export default Dashboard;
