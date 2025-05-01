# Healthcare Dashboard

![Healthcare Dashboard](/Images/Healthcare%20Dashboard.png)

## 📋 Overview

Healthcare Dashboard is a modern, responsive web application designed for healthcare professionals to efficiently manage patient information, track vital signs, view diagnostic history, and monitor lab results. The dashboard provides a comprehensive view of patient health data with intuitive visualizations and a user-friendly interface.

## ✨ Features

### 📊 Interactive Patient Dashboard

- **Blood Pressure Chart**: Visualize patient blood pressure trends over time with interactive charts
- **Vital Signs Monitoring**: Track respiratory rate, heart rate, and temperature with status indicators
- **Diagnostic History**: View and manage patient diagnoses with status tracking
- **Lab Results**: Access and download patient lab test results

### 👤 Patient Management

- **Patient List**: Browse through patient records with easy navigation
- **Patient Information**: View comprehensive patient details including demographics and insurance information
- **Responsive Design**: Optimized for all devices from mobile phones to desktop computers

### 🎨 Modern UI/UX

- **Clean Interface**: Intuitive and distraction-free user interface
- **Responsive Components**: All components adapt to different screen sizes
- **Interactive Elements**: Hover effects, transitions, and visual feedback for better user experience
- **Accessibility**: Designed with accessibility in mind for all users

## 🛠️ Technologies Used

- **Frontend Framework**: React 19
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Styling**: TailwindCSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **HTTP Client**: Axios

## 📱 Responsive Design

The application is fully responsive and optimized for:

- 📱 Mobile devices
- 📱 Tablets
- 💻 Laptops
- 🖥️ Desktop computers

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/healthcaredashboard.git
cd healthcaredashboard
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Key Components

### Dashboard

The main container component that orchestrates the display of patient information, vital signs, diagnostic history, and lab results.

### BloodPressureChart

Interactive chart component that visualizes patient blood pressure trends over time using Recharts.

### VitalSigns

Displays current vital signs including respiratory rate, temperature, and heart rate with status indicators.

### DiagnosticTable

Responsive table component that displays patient diagnostic history with status indicators and detailed information.

### LabResults

Displays patient lab test results with download functionality and responsive design.

### PatientInfo

Shows comprehensive patient information including demographics, contact details, and insurance information.

### Sidebar

Navigation component that displays the list of patients with search functionality and responsive design.

### Navbar

Top navigation bar with tabs for different sections of the application and user profile information.

## 📝 Project Structure

```
src/
├── components/           # React components
│   ├── BloodPressureChart.jsx
│   ├── Dashboard.jsx
│   ├── DiagnosticTable.jsx
│   ├── LabResults.jsx
│   ├── mockPatients.jsx
│   ├── Navbar.jsx
│   ├── PatientInfo.jsx
│   ├── Sidebar.jsx
│   └── VitalSigns.jsx
├── redux/                # Redux state management
│   ├── Store.jsx
│   └── users/
│       └── usersSlice.jsx
├── services/             # API services
│   └── api.jsx
├── App.jsx               # Main App component
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## 🌟 Future Enhancements

- **Dark Mode**: Implement dark mode for better viewing in low-light environments
- **Authentication**: Add user authentication and role-based access control
- **Notifications**: Implement real-time notifications for critical patient updates
- **Appointment Scheduling**: Add functionality to schedule and manage patient appointments
- **Medical Records**: Expand functionality to include full medical records
- **Telemedicine Integration**: Add video consultation capabilities

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributors

- [Your Name](https://github.com/yourusername) - Lead Developer

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for the amazing chart library
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
- [Vite](https://vitejs.dev/) for the blazing fast build tool
