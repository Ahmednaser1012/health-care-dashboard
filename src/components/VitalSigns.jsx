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
  // Check if vitalSigns is available
  if (!vitalSigns) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm col-span-3 text-center">
          <p className="text-gray-500">No vital signs data available</p>
        </div>
      </div>
    );
  }

  // Check which data structure we're dealing with
  const isNewFormat =
    vitalSigns.respiratory_rate &&
    vitalSigns.heart_rate &&
    vitalSigns.temperature;
  const isOldFormat =
    vitalSigns.respiratoryRate !== undefined &&
    vitalSigns.heartRate !== undefined;

  // Get respiratory rate value
  const getRespiratoryRate = () => {
    if (isNewFormat && vitalSigns.respiratory_rate) {
      return vitalSigns.respiratory_rate.value;
    } else if (isOldFormat) {
      return vitalSigns.respiratoryRate;
    } else if (vitalSigns.respiratoryRate) {
      return vitalSigns.respiratoryRate;
    }
    return "N/A";
  };

  // Get heart rate value
  const getHeartRate = () => {
    if (isNewFormat && vitalSigns.heart_rate) {
      return vitalSigns.heart_rate.value;
    } else if (isOldFormat) {
      return vitalSigns.heartRate;
    } else if (vitalSigns.heartRate) {
      return vitalSigns.heartRate;
    }
    return "N/A";
  };

  // Get temperature value
  const getTemperature = () => {
    if (isNewFormat && vitalSigns.temperature) {
      return vitalSigns.temperature.value;
    } else if (isOldFormat) {
      return vitalSigns.temperature;
    } else if (vitalSigns.temperature) {
      return vitalSigns.temperature;
    }
    return "N/A";
  };

  // Get respiratory rate status
  const getRespiratoryRateStatus = () => {
    const value = getRespiratoryRate();
    if (value === "N/A") return "Unknown";
    return value > 20
      ? "Higher than Average"
      : value < 12
      ? "Lower than Average"
      : "Normal";
  };

  // Get heart rate status
  const getHeartRateStatus = () => {
    const value = getHeartRate();
    if (value === "N/A") return "Unknown";
    return value > 100
      ? "Higher than Average"
      : value < 60
      ? "Lower than Average"
      : "Normal";
  };

  // Get temperature status
  const getTemperatureStatus = () => {
    const value = getTemperature();
    if (value === "N/A") return "Unknown";
    return value > 99
      ? "Higher than Average"
      : value < 97
      ? "Lower than Average"
      : "Normal";
  };

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
            {getRespiratoryRate()} bpm
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {getRespiratoryRateStatus()}
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
            {getTemperature()}°F
          </p>
          <p className="text-xs text-gray-500 mt-1">{getTemperatureStatus()}</p>
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
            {getHeartRate()} bpm
          </p>
          <p className="text-xs text-gray-500 mt-1">{getHeartRateStatus()}</p>
        </div>
      </div>
    </div>
  );
};

export default VitalSigns;
