import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { patientService } from "../../services/api";

// Initial state
const initialState = {
  patients: [],
  selectedPatient: null,
  status: "idle",
  error: null,
};

// Async thunk for fetching patients
export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    // Using our patient service
    return await patientService.getPatients();
  }
);

// Create the slice
const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    // Action to select a patient
    selectPatient: (state, action) => {
      state.selectedPatient =
        state.patients.find((patient) => patient.id === action.payload) || null;
    },
    // Clear selected patient
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add patients to the state array
        state.patients = action.payload;
        // Select the first patient by default
        if (action.payload.length > 0 && !state.selectedPatient) {
          state.selectedPatient = action.payload[0];
        }
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch patients";
      });
  },
});

// Export actions and reducer
export const { selectPatient, clearSelectedPatient } = patientSlice.actions;
export default patientSlice.reducer;

// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const api = axios.create({
//   baseURL: "https://fedskillstest.coalitiontechnologies.workers.dev",
//   auth: {
//     username: "coalition",
//     password: "skills-test",
//   },
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // إضافة Interceptors لمعالجة الطلبات والاستجابات
// api.interceptors.response.use(
//   (response) => response.data, // استخراج البيانات مباشرة
//   (error) => {
//     console.error("API error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// // دوال لاستدعاء API
// const patientService = {
//   getPatients: () => api.get("/patients"),
//   getPatientById: (id) =>
//     id ? api.get(`/patients/${id}`) : Promise.reject("Patient ID is required"),
//   getPatientVitalSigns: (id) =>
//     id
//       ? api.get(`/patients/${id}/vitals`)
//       : Promise.reject("Patient ID is required"),
//   getPatientBloodPressureHistory: (id) =>
//     id
//       ? api.get(`/patients/${id}/blood-pressure`)
//       : Promise.reject("Patient ID is required"),
// };

// // ** Thunks لجلب البيانات **

// // جلب قائمة المرضى
// export const fetchPatients = createAsyncThunk(
//   "patients/fetchPatients",
//   async (_, { rejectWithValue }) => {
//     try {
//       return await patientService.getPatients();
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // جلب تفاصيل مريض معين
// export const fetchPatientDetails = createAsyncThunk(
//   "patients/fetchPatientDetails",
//   async (patientId, { rejectWithValue }) => {
//     try {
//       if (!patientId) throw new Error("Patient ID is required");

//       const [patientData, vitalSigns, bloodPressureHistory] = await Promise.all(
//         [
//           patientService.getPatientById(patientId),
//           patientService.getPatientVitalSigns(patientId),
//           patientService.getPatientBloodPressureHistory(patientId),
//         ]
//       );

//       return {
//         ...patientData,
//         vitalSigns: {
//           ...vitalSigns,
//           bloodPressure: {
//             systolic: vitalSigns.bloodPressure?.systolic || 0,
//             diastolic: vitalSigns.bloodPressure?.diastolic || 0,
//             history: bloodPressureHistory || [],
//           },
//         },
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // ** Redux Slice لإدارة حالة المرضى **
// const patientSlice = createSlice({
//   name: "patients",
//   initialState: {
//     patients: [],
//     selectedPatient: null,
//     status: "idle", // حالة جلب المرضى
//     detailsStatus: "idle", // حالة جلب تفاصيل المريض
//     error: null,
//   },
//   reducers: {
//     // اختيار مريض معين
//     selectPatient: (state, action) => {
//       state.selectedPatient =
//         state.patients.find((p) => p.id === action.payload) || null;
//     },
//     // مسح بيانات المريض المحدد
//     clearSelectedPatient: (state) => {
//       state.selectedPatient = null;
//       state.detailsStatus = "idle";
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPatients.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchPatients.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.patients = action.payload;
//         if (action.payload.length > 0 && !state.selectedPatient) {
//           state.selectedPatient = action.payload[0]; // تحديد أول مريض تلقائيًا
//           state.detailsStatus = "loading"; // بدء جلب التفاصيل
//         }
//       })
//       .addCase(fetchPatients.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(fetchPatientDetails.pending, (state) => {
//         state.detailsStatus = "loading";
//         state.error = null;
//       })
//       .addCase(fetchPatientDetails.fulfilled, (state, action) => {
//         state.detailsStatus = "succeeded";
//         state.selectedPatient = action.payload;
//       })
//       .addCase(fetchPatientDetails.rejected, (state, action) => {
//         state.detailsStatus = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// // تصدير الـ Actions و Reducer
// export const { selectPatient, clearSelectedPatient } = patientSlice.actions;
// export default patientSlice.reducer;
