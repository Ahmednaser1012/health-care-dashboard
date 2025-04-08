// import { TreesIcon as Lungs, Thermometer, Heart } from "lucide-react";

// const VitalSigns = ({ vitalSigns }) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {/* Respiratory Rate Card */}
//       <div className="bg-[#E0F3FA] p-4 rounded-lg shadow-sm">
//         <div className="flex items-center mb-2">
//           <Lungs className="h-6 w-6 text-blue-500 mr-2" />
//           <h3 className="text-sm font-medium text-gray-600">Respiratory</h3>
//         </div>
//         <div className="mt-2">
//           <p className="text-2xl font-bold text-gray-800">
//             {vitalSigns.respiratoryRate} bpm
//           </p>
//           <p className="text-xs text-gray-500 mt-1">Normal</p>
//         </div>
//       </div>

//       {/* Temperature Card */}
//       <div className="bg-[#FFE6E9] p-4 rounded-lg shadow-sm">
//         <div className="flex items-center mb-2">
//           <Thermometer className="h-6 w-6 text-red-400 mr-2" />
//           <h3 className="text-sm font-medium text-gray-600">Temperature</h3>
//         </div>
//         <div className="mt-2">
//           <p className="text-2xl font-bold text-gray-800">
//             {vitalSigns.temperature}°F
//           </p>
//           <p className="text-xs text-gray-500 mt-1">Normal</p>
//         </div>
//       </div>

//       {/* Heart Rate Card */}
//       <div className=" p-4 rounded-lg shadow-sm bg-[#FFE6F1]">
//         <div className="flex items-center mb-2">
//           <Heart className="h-6 w-6 text-red-500 mr-2" />
//           <h3 className="text-sm font-medium text-gray-600">Heart Rate</h3>
//         </div>
//         <div className="mt-2">
//           <p className="text-2xl font-bold text-gray-800">
//             {vitalSigns.heartRate} bpm
//           </p>
//           <p className="text-xs text-gray-500 mt-1">
//             {vitalSigns.heartRate < 60
//               ? "Lower than Average"
//               : vitalSigns.heartRate > 100
//               ? "Higher than Average"
//               : "Normal"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VitalSigns;
import { TreesIcon as Lungs, Thermometer, Heart } from "lucide-react";

const VitalSigns = ({ vitalSigns }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Respiratory Rate Card */}
      <div className="bg-[#E0F3FA] p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <Lungs className="h-6 w-6 text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">
            Respiratory Rate
          </h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-800">
            {vitalSigns?.respiratory_rate.value}
            bpm
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {vitalSigns?.respiratory_rate.value > 20
              ? "Higher than Average"
              : vitalSigns?.respiratory_rate.value < 12
              ? "Lower than Average"
              : "Normal"}
          </p>
        </div>
      </div>

      {/* Temperature Card */}
      <div className="bg-[#FFE6E9] p-4 rounded-lg shadow-sm">
        <div className="flex items-center mb-2">
          <Thermometer className="h-6 w-6 text-red-400 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Temperature</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-800">
            {vitalSigns?.temperature.value}°F
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {vitalSigns?.temperature.value > 99
              ? "Higher than Average"
              : vitalSigns?.temperature.value < 97
              ? "Lower than Average"
              : "Normal"}
          </p>
        </div>
      </div>

      {/* Heart Rate Card */}
      <div className="p-4 rounded-lg shadow-sm bg-[#FFE6F1]">
        <div className="flex items-center mb-2">
          <Heart className="h-6 w-6 text-red-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-600">Heart Rate</h3>
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold text-gray-800">
            {vitalSigns?.heart_rate.value} bpm
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {vitalSigns?.heart_rate.value > 100
              ? "Higher than Average"
              : vitalSigns?.heart_rate.value < 60
              ? "Lower than Average"
              : "Normal"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;
