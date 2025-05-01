import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar";

import Navbar from "./components/Navbar";
import { fetchPatients } from "./redux/users/usersSlice";
import Dashboard from "./components/Dashboard";

function App() {
  const dispatch = useDispatch();

  // Fetch patients data when component mounts
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex justify-center gap-8 overflow-y-auto p-4">
          <Sidebar />
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
