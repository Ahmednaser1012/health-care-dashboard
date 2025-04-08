// import axios from "axios";
// import { mockPatients } from "../components/mockPatients";

// // Create an axios instance with default config
// const api = axios.create({
//     baseURL: "https://api.example.com", // Replace with actual API URL
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json",
//     },
// });

// // Add request interceptor for authentication
// api.interceptors.request.use(
//     (config) => {
//         // You can add auth token here if needed
//         // const token = localStorage.getItem('token');
//         // if (token) {
//         //   config.headers.Authorization = `Bearer ${token}`;
//         // }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// // Add response interceptor for error handling
// api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         // Handle specific error codes
//         if (error.response) {
//             switch (error.response.status) {
//                 case 401:
//                     console.error("Unauthorized access");
//                     // Handle unauthorized (e.g., redirect to login)
//                     break;
//                 case 404:
//                     console.error("Resource not found");
//                     break;
//                 case 500:
//                     console.error("Server error");
//                     break;
//                 default:
//                     console.error("API error:", error.response.data);
//             }
//         } else if (error.request) {
//             console.error("No response received:", error.request);
//         } else {
//             console.error("Error setting up request:", error.message);
//         }

//         return Promise.reject(error);
//     }
// );

// // API service functions
// export const patientService = {
//     // Get all patients
//     getPatients: async () => {
//         try {
//             // Using mock data for now
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     resolve(mockPatients);
//                 }, 1000); // Simulate network delay
//             });
//         } catch (error) {
//             console.error("Error fetching patients:", error);
//             throw error;
//         }
//     },

//     // Get patient by ID
//     getPatientById: async (id) => {
//         try {
//             // Using mock data for now
//             return new Promise((resolve, reject) => {
//                 setTimeout(() => {
//                     const patient = mockPatients.find((p) => p.id === id);
//                     if (patient) {
//                         resolve(patient);
//                     } else {
//                         reject(new Error("Patient not found"));
//                     }
//                 }, 500);
//             });
//         } catch (error) {
//             console.error(`Error fetching patient with ID ${id}:`, error);
//             throw error;
//         }
//     },
// };

// export default api;

/*************************** */
import axios from "axios";

// Create an axios instance with default config
const api = axios.create({
    baseURL: "https://fedskillstest.coalitiontechnologies.workers.dev",
    // Add basic authentication
    auth: {
        username: "coalition",
        password: "skills-test",
    },
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error("Unauthorized access - Invalid credentials");
                    break;
                case 404:
                    console.error("Resource not found");
                    break;
                case 500:
                    console.error("Server error - Please try again later");
                    break;
                default:
                    console.error("API error:", error.response.data);
            }
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
        return Promise.reject(error);
    }
);

// API service functions
export const patientService = {
    getPatients: async () => {
        try {
            return await api.get("/patients");
        } catch (error) {
            console.error("Error fetching patients:", error);
            throw error;
        }
    },

    getPatientById: async (id) => {
        try {
            if (!id) throw new Error("Patient ID is required");
            return await api.get(`/patients/${id}`);
        } catch (error) {
            console.error(
                `Error fetching patient with ID ${id || "undefined"}:`,
                error
            );
            throw error;
        }
    },

    getPatientVitalSigns: async (id) => {
        try {
            if (!id) throw new Error("Patient ID is required");
            return await api.get(`/patients/${id}/vitals`);
        } catch (error) {
            console.error(
                `Error fetching vital signs for patient ID ${
                    id || "undefined"
                }:`,
                error
            );
            throw error;
        }
    },

    getPatientBloodPressureHistory: async (id) => {
        try {
            if (!id) throw new Error("Patient ID is required");
            return await api.get(`/patients/${id}/blood-pressure`);
        } catch (error) {
            console.error(
                `Error fetching blood pressure history for patient ID ${
                    id || "undefined"
                }:`,
                error
            );
            throw error;
        }
    },
};

export default api;
