import { useDispatch, useSelector } from "react-redux";

import { Search, MoreVertical } from "lucide-react";
import { selectPatient } from "../redux/users/usersSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const { patients, selectedPatient, status } = useSelector(
        (state) => state.patients
    );

    // Function to handle patient selection
    const handleSelectPatient = (patientId) => {
        dispatch(selectPatient(patientId));
    };

    return (
        <div className="w-64 h-full bg-white border-full border-gray-800 rounded-2xl flex flex-col ">
            <div className="flex justify-between items-center p-4 ">
                <h2 className="text-lg font-semibold text-gray-800 ">
                    Patients
                </h2>

                <Search className="  h-4 w-4 text-black cursor-pointer" />
            </div>

            {/* Patient list */}
            <div className="flex-1 overflow-y-auto">
                {status === "loading" ? (
                    // Loading skeleton
                    <div className="p-4 space-y-4">
                        {[...Array(5)].map((i, index) => (
                            <div
                                key={(i, index)}
                                className="flex items-center space-x-3 animate-pulse"
                            >
                                <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Actual patient list
                    <ul>
                        {patients.map((patient, index) => (
                            <li
                                key={index}
                                className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 ${
                                    selectedPatient?.id === index
                                        ? "bg-gray-100"
                                        : ""
                                }`}
                                onClick={() => handleSelectPatient(index)}
                            >
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                                        <img
                                            src={
                                                patient?.profile_picture ||
                                                " https://fedskillstest.ct.digital/4.png"
                                            }
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">
                                            {patient.name}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            {patient.gender}, {patient.age}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <MoreVertical size={12} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Search, MoreVertical } from "lucide-react";
// import { fetchPatients, selectPatient } from "../redux/users/usersSlice";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const { patients, selectedPatient, status } = useSelector(
//     (state) => state.patients
//   );

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchPatients());
//     }
//   }, [dispatch, status]);

//   const handleSelectPatient = (patientId) => {
//     dispatch(selectPatient(patientId));
//   };

//   return (
//     <div className="w-64 h-full bg-white border border-gray-200 rounded-2xl flex flex-col">
//       <div className="flex justify-between items-center p-4">
//         <h2 className="text-lg font-semibold text-gray-800">Patients</h2>
//         <Search className="h-4 w-4 text-black cursor-pointer" />
//       </div>

//       <div className="flex-1 overflow-y-auto">
//         {status === "loading" ? (
//           <LoadingSkeleton />
//         ) : (
//           <PatientList
//             patients={patients}
//             selectedPatient={selectedPatient}
//             onSelect={handleSelectPatient}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// const LoadingSkeleton = () => (
//   <div className="p-4 space-y-4">
//     {[...Array(5)].map((_, i) => (
//       <div key={i} className="flex items-center space-x-3 animate-pulse">
//         <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
//         <div className="flex-1">
//           <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//           <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//         </div>
//       </div>
//     ))}
//   </div>
// );

// const PatientList = ({ patients, selectedPatient, onSelect }) => (
//   <ul>
//     {patients.map((patient) => (
//       <li
//         key={patient.id}
//         className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 ${
//           selectedPatient?.id === patient.id ? "bg-gray-100" : ""
//         }`}
//         onClick={() => onSelect(patient.id)}
//       >
//         <div className="flex items-center">
//           <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-3">
//             <img
//               src={
//                 patient?.profile_picture ||
//                 "https://fedskillstest.ct.digital/4.png"
//               }
//               className="h-full w-full object-cover"
//               alt="profile"
//             />
//           </div>
//           <div>
//             <h3 className="font-medium text-gray-800">{patient.name}</h3>
//             <p className="text-xs text-gray-500">
//               {patient.gender}, {patient.age}
//             </p>
//           </div>
//         </div>
//         <button className="text-gray-400 hover:text-gray-600">
//           <MoreVertical size={12} />
//         </button>
//       </li>
//     ))}
//   </ul>
// );

// export default Sidebar;
