import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("patients");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tabs for the navigation
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      img: "/Images/home_FILL0_wght300_GRAD0_opsz24.svg",
    },

    {
      id: "patients",
      label: "Patients",
      img: "/Images/group_FILL0_wght300_GRAD0_opsz24.svg",
    },
    {
      id: "schedule",
      label: "Schedule",
      img: "/Images/calendar_today_FILL0_wght300_GRAD0_opsz24.svg",
    },
    {
      id: "message",
      label: "Message",
      img: "/Images/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg",
    },
    {
      id: "transactions",
      label: "Transactions",
      img: "/Images/credit_card_FILL0_wght300_GRAD0_opsz24.svg",
    },
  ];

  return (
    <header className="bg-white m-3 border-b rounded-lg md:rounded-full border-gray-200 relative">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="">
              <img
                src="/Images/TestLogo.svg"
                className="h-10 md:h-10 w-auto"
                alt="Logo"
              />
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation tabs - desktop */}
        <nav className="hidden md:flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex justify-between items-center gap-1">
                <img src={tab.img} alt={tab.label} className="w-5 h-5" />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>

        {/* User profile and notifications */}
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
              <img
                src="/Images/senior-woman-doctor-and-portrait-smile-for-health-2023-11-27-05-18-16-utc.png"
                alt="User avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="ml-2 text-[10px] font-medium text-gray-700 hidden md:inline-block">
              Dr. Jane Simmons
              <br />
              <span className="text-gray-400 text-[10px]">
                General Practitioner
              </span>
            </span>
            <span className="text-gray-500 ml-4 hidden md:inline-block">|</span>
            <span className="hidden md:inline-block">
              <img
                src="/Images/settings_FILL0_wght300_GRAD0_opsz24.png"
                className="mx-3 w-3 cursor-pointer"
                alt="Settings"
              />
            </span>
            <span className="hidden md:inline-block">
              <img
                src="/Images/more_vert_FILL0_wght300_GRAD0_opsz24@2x.png"
                className="mx-1 w-1 cursor-pointer"
                alt="More"
              />
            </span>
          </div>
        </div>
      </div>

      {/* Mobile navigation menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 py-2 px-4 shadow-lg rounded-b-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium cursor-pointer mb-1 flex items-center ${
                activeTab === tab.id
                  ? "bg-teal-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
            >
              <img src={tab.img} alt={tab.label} className="w-5 h-5 mr-3" />
              {tab.label}
            </button>
          ))}

          {/* Mobile user options */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center px-4 py-2">
              <img
                src="/Images/settings_FILL0_wght300_GRAD0_opsz24.png"
                className="w-5 h-5 mr-3"
                alt="Settings"
              />
              <span className="text-gray-600">Settings</span>
            </div>
            <div className="flex items-center px-4 py-2">
              <img
                src="/Images/more_vert_FILL0_wght300_GRAD0_opsz24@2x.png"
                className="w-5 h-5 mr-3"
                alt="More"
              />
              <span className="text-gray-600">More Options</span>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
