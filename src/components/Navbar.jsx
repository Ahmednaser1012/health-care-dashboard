import { useState } from "react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("patients");
  // const { selectedPatient } = useSelector((state) => state.patients)

  // Tabs for the navigation
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      img: "../../public/Images/home_FILL0_wght300_GRAD0_opsz24.svg",
    },

    {
      id: "patients",
      label: "Patients",
      img: "../../public/Images/group_FILL0_wght300_GRAD0_opsz24.svg",
    },
    {
      id: "schedule",
      label: "Schedule",
      img: "../../public/Images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg",
    },
    {
      id: "message",
      label: "Message",
      img: "../../public/Images/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg",
    },
    {
      id: "transactions",
      label: "Transactions",
      img: "../../public/Images/credit_card_FILL0_wght300_GRAD0_opsz24.svg",
    },
  ];

  return (
    <header className=" bg-white m-3 border-b rounded-full border-gray-200">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="">
              <img
                src="../../public/Images/TestLogo.svg"
                className="h-20 w-50 "
              ></img>
            </div>
          </div>
        </div>

        {/* Navigation tabs - desktop */}
        <nav className="hidden md:flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={` px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${
                activeTab === tab.id
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex justify-between items-center gap-1">
                <img src={tab.img} alt={tab.label} className="w-5 h-5  " />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>

        {/* User profile and notifications */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="../../public/Images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="ml-2 text-[10px] font-medium text-gray-700  hidden md:inline-block">
              Dr. Jane Simmons
              <br></br>
              <span className="text-gray-400 text-[10px] ">
                General Practitioner
              </span>{" "}
            </span>
            <span className="text-gray-500 ml-4">|</span>
            <span>
              <img
                src="../../public/Images/settings_FILL0_wght300_GRAD0_opsz24.png"
                className="mx-3 w-3 cursor-pointer"
              ></img>
            </span>
            <span>
              <img
                src="../../public/Images/more_vert_FILL0_wght300_GRAD0_opsz24@2x.png"
                className="mx-1 w-1 cursor-pointer"
              ></img>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
