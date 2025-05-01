import { Phone, Building, Calendar, User } from "lucide-react";

const PatientInfo = ({ patient }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Patient header with avatar */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
          <img
            src={
              patient?.profile_picture ||
              "https://fedskillstest.ct.digital/4.png"
            }
            alt={patient.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{patient.name}</h2>
      </div>

      {/* Patient details */}
      <div className="p-4 space-y-4">
        {/* Date of Birth */}
        <div className="flex items-start">
          <div className="mr-3 mt-0.5 bg-gray-200 p-2 rounded-full">
            <Calendar size={18} className="text-gray-900" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Date of Birth</p>
            <p className="text-sm font-medium">
              {patient.date_of_birth || patient.dob || "N/A"}
            </p>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-start">
          <div className="mr-3 mt-0.5 bg-gray-200 p-2 rounded-full">
            <User size={18} className="text-gray-900" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="text-sm font-medium">{patient.gender}</p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start">
          <div className="mr-3 mt-0.5 bg-gray-200 p-2 rounded-full">
            <Phone size={18} className="text-gray-900" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="text-sm font-medium">
              {patient.phone_number || patient.phone || "N/A"}
            </p>
          </div>
        </div>

        {/* Insurance */}
        <div className="flex items-start">
          <div className="mr-3 mt-0.5 bg-gray-200 p-2 rounded-full">
            <Building size={18} className="text-gray-900" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Insurance Provider</p>
            <p className="text-sm font-medium">
              {patient.insurance_type || patient.insurance || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Show all information button */}
      <div className="p-4  border-gray-200">
        <button className="w-full py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors cursor-pointer">
          Show All Information
        </button>
      </div>
    </div>
  );
};

export default PatientInfo;
