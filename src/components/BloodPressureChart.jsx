import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BloodPressureChart = ({ bloodPressureData }) => {
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState("6months");

  // Process the data for the chart
  useEffect(() => {
    if (!bloodPressureData || bloodPressureData.length === 0) {
      setChartData([]);
      console.log("No blood pressure data available");
      return;
    }

    console.log("Processing blood pressure data:", bloodPressureData);

    try {
      // Format the data for the chart
      const formattedData = bloodPressureData.map((item) => {
        // Check if the date is already formatted or needs formatting
        let formattedDate;
        try {
          formattedDate = new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          });
        } catch (error) {
          // If date parsing fails, use the date as is
          formattedDate = item.date;
        }

        return {
          date: formattedDate,
          systolic: item.systolic,
          diastolic: item.diastolic,
        };
      });

      // Sort by date
      formattedData.sort((a, b) => {
        try {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } catch (error) {
          // If date comparison fails, maintain original order
          return 0;
        }
      });

      console.log("Formatted chart data:", formattedData);
      setChartData(formattedData);
    } catch (error) {
      console.error("Error processing blood pressure data:", error);
      setChartData([]);
    }
  }, [bloodPressureData]);

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-red-500">
            Systolic: {payload[0].value} mmHg
          </p>
          <p className="text-xs text-purple-500">
            Diastolic: {payload[1].value} mmHg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#F4F0FE] p-4 rounded-3xl mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700">Blood Pressure</h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="text-xs border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="1month">Last 1 month</option>
          <option value="3months">Last 3 months</option>
          <option value="6months">Last 6 months</option>
          <option value="1year">Last 1 year</option>
        </select>
      </div>

      <div className="h-64">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis
                domain={[60, 180]}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Systolic"
              />
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name="Diastolic"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-500">No blood pressure data available</p>
              <p className="text-sm text-gray-400">
                Please check the patient's records
              </p>
            </div>
          </div>
        )}
      </div>
      {chartData.length > 0 && (
        <>
          {/* Systolic indicator */}
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs font-medium">Systolic</span>
            <span className="ml-2 text-sm font-bold">
              {chartData[chartData.length - 1].systolic || "N/A"}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              {chartData[chartData.length - 1].systolic > 120
                ? "Higher than Average"
                : "Normal"}
            </span>
          </div>

          {/* Diastolic indicator */}
          <div className="mt-2 flex items-center mb-1">
            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-xs font-medium">Diastolic</span>
            <span className="ml-2 text-sm font-bold">
              {chartData[chartData.length - 1].diastolic || "N/A"}
            </span>
            <span className="ml-2 text-xs text-gray-500">
              {chartData[chartData.length - 1].diastolic < 80
                ? "Lower than Average"
                : "Normal"}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default BloodPressureChart;

// import { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// const BloodPressureChart = ({ bloodPressureData }) => {
//   const [chartData, setChartData] = useState([]);
//   const [timeRange, setTimeRange] = useState("6months");

//   // معالجة البيانات بناءً على النطاق الزمني
//   useEffect(() => {
//     if (!bloodPressureData || bloodPressureData.length === 0) {
//       setChartData([]);
//       return;
//     }

//     const now = new Date();
//     const rangeMap = {
//       "1month": 1,
//       "3months": 3,
//       "6months": 6,
//       "1year": 12,
//     };
//     const monthsBack = rangeMap[timeRange];
//     const filterDate = new Date(now.setMonth(now.getMonth() - monthsBack));

//     const formattedData = bloodPressureData
//       .filter((item) => new Date(item.date) >= filterDate)
//       .map((item) => ({
//         date: new Date(item.date).toLocaleDateString("en-US", {
//           month: "short",
//           year: "2-digit",
//         }),
//         systolic: item.systolic,
//         diastolic: item.diastolic,
//       }))
//       .sort((a, b) => new Date(a.date) - new Date(b.date));

//     setChartData(formattedData);
//   }, [bloodPressureData, timeRange]);

//   // حساب أحدث قيمة لضغط الدم
//   const latestData = chartData[chartData.length - 1] || {
//     systolic: "N/A",
//     diastolic: "N/A",
//   };

//   // Custom Tooltip
//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
//           <p className="text-sm font-medium">{label}</p>
//           <p className="text-xs text-red-500">
//             Systolic: {payload[0].value} mmHg
//           </p>
//           <p className="text-xs text-purple-500">
//             Diastolic: {payload[1].value} mmHg
//           </p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="bg-[#F4F0FE] p-4 rounded-3xl mb-4">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-sm font-medium text-gray-700">Blood Pressure</h3>
//         <select
//           value={timeRange}
//           onChange={(e) => setTimeRange(e.target.value)}
//           className="text-xs border border-gray-300 rounded-md px-2 py-1"
//         >
//           <option value="1month">Last 1 month</option>
//           <option value="3months">Last 3 months</option>
//           <option value="6months">Last 6 months</option>
//           <option value="1year">Last 1 year</option>
//         </select>
//       </div>

//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart
//             data={chartData}
//             margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} />
//             <YAxis
//               domain={[60, 180]}
//               tick={{ fontSize: 12 }}
//               tickLine={false}
//               axisLine={false}
//             />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="systolic"
//               stroke="#ef4444"
//               strokeWidth={2}
//               dot={{ r: 3 }}
//               activeDot={{ r: 5 }}
//               name="Systolic"
//             />
//             <Line
//               type="monotone"
//               dataKey="diastolic"
//               stroke="#8b5cf6"
//               strokeWidth={2}
//               dot={{ r: 3 }}
//               activeDot={{ r: 5 }}
//               name="Diastolic"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Systolic indicator */}
//       <div className="mt-4 flex items-center">
//         <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
//         <span className="text-xs font-medium">Systolic</span>
//         <span className="ml-2 text-sm font-bold">{latestData.systolic}</span>
//         <span className="ml-2 text-xs text-gray-500">
//           {latestData.systolic > 120 ? "Higher than Average" : "Normal"}
//         </span>
//       </div>

//       {/* Diastolic indicator */}
//       <div className="mt-2 flex items-center mb-1">
//         <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
//         <span className="text-xs font-medium">Diastolic</span>
//         <span className="ml-2 text-sm font-bold">{latestData.diastolic}</span>
//         <span className="ml-2 text-xs text-gray-500">
//           {latestData.diastolic < 80 ? "Lower than Average" : "Normal"}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default BloodPressureChart;
