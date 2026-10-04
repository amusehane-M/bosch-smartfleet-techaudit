import React, { useState } from 'react';
import SidebarNav from './components/SidebarNav';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import BookingForm from './pages/BookingForm';
import FleetList from './pages/FleetList';
import InspectionsList from './pages/InspectionsList';
import CertificatesList from './pages/CertificatesList';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { User, LogOut, ChevronDown, Bell } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Stores logged in user payload
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Profile State for Staff
  const [userProfile, setUserProfile] = useState({
    name: 'J. van der Merwe',
    role: 'Lead Fleet Inspector',
    email: 'j.vandermerwe@boschservice.co.za',
    station: 'Bosch Service Center - Midrand',
  });

  // Shared State across the system
  const [bookings, setBookings] = useState([
    {
      id: 'BKN-1001',
      registration: 'GP 88 KH ZP',
      vin: '1HGCM82633A004352',
      dateSlot: '2026-09-21 @ 09:00 AM',
      station: 'Bosch Service Center - Midrand',
      status: 'Confirmed',
    },
  ]);

  const [inspections, setInspections] = useState([
    {
      id: 'AUD-8921',
      registration: 'GP 88 KH ZP',
      inspector: 'S. Dlamini',
      date: '2026-09-20',
      score: '98%',
      result: 'Passed',
    },
    {
      id: 'AUD-8922',
      registration: 'CA 123 456',
      inspector: 'M. Naidoo',
      date: '2026-09-21',
      score: '62%',
      result: 'Failed',
    },
    {
      id: 'AUD-8923',
      registration: 'ND 990 112',
      inspector: 'J. van der Merwe',
      date: '2026-09-21',
      score: '94%',
      result: 'Passed',
    },
  ]);

  const [certificates, setCertificates] = useState([
    {
      certNo: 'CERT-2026-001',
      engineNo: '4HK1-982341',
      makeModel: 'Isuzu NPR 400',
      year: '2022',
      vehicleType: 'Heavy Commercial / Box Body',
      odometer: '124,500 km',
      owner: 'Gauteng Logistics Fleet Co.',
      regNo: 'GP 88 KH ZP',
      category: 'B',
      outcome: 'PASS',
      inspectDate: '01-09-2026',
      nextDueDate: '01-09-2027',
      location: 'Mokopane Test Centre',
      inspectionType: 'Periodic Safety & Brake Audit',
      inspectorName: 'J. van der Merwe',
      inspectorId: 'TECH-8842',
      authorisedName: 'M. N. Muwanguzi',
    },
  ]);

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);

    // If staff user returned, update active profile header name/email
    if (userData && userData.userType === 'staff') {
      setUserProfile((prev) => ({
        ...prev,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
        role: userData.role || prev.role,
      }));
    }
  };

  const handleCreateBooking = (bookingData) => {
    const newBooking = {
      id: `BKN-${Math.floor(1000 + Math.random() * 9000)}`,
      ...bookingData,
      status: 'Confirmed',
    };

    setBookings((prev) => [newBooking, ...prev]);

    const newInspection = {
      id: `AUD-${Math.floor(8000 + Math.random() * 1000)}`,
      registration: bookingData.registration || 'GP 123-456',
      inspector: 'Pending Assignment',
      date: bookingData.dateSlot ? bookingData.dateSlot.split(' @')[0] : '2026-09-21',
      score: 'Pending',
      result: 'Pending',
    };

    setInspections((prev) => [newInspection, ...prev]);
    setActiveTab('inspections');
  };

  const handleCompleteInspection = (completedAudit, certificateData) => {
    setInspections((prev) =>
      prev.map((item) => (item.id === completedAudit.id ? completedAudit : item))
    );

    if (certificateData) {
      setCertificates((prev) => [certificateData, ...prev]);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setShowProfileMenu(false);
  };

  // 1. Unauthenticated State -> Show Login/Register
  if (!isAuthenticated) {
    return <LoginRegister onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. Customer State -> Show Dedicated Customer Dashboard (Reuses handleCreateBooking)
  if (currentUser?.userType === 'customer') {
    return (
      <CustomerDashboard
        user={currentUser}
        bookings={bookings}
        certificates={certificates}
        onLogout={handleLogout}
        onBookInspection={handleCreateBooking}
      />
    );
  }

  // 3. Staff/Admin State -> Full Management Layout with Sidebar
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden select-none">
      {/* Sidebar Component */}
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content & Top Header Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Navbar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 shadow-sm">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
            {activeTab} Module
          </h2>

          <div className="flex items-center gap-4 relative">
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition cursor-pointer">
              <Bell className="w-4 h-4" />
            </button>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition text-left cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#005691] text-white flex items-center justify-center font-bold text-xs">
                  {userProfile.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-xs">
                  <p className="font-bold text-slate-800 leading-none">{userProfile.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{userProfile.role}</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">{userProfile.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{userProfile.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" /> Account Profile & Settings
                  </button>

                  <div className="border-t border-slate-100 my-1"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Route Pages */}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              onNavigate={(tab) => setActiveTab(tab)}
              inspections={inspections}
              certificates={certificates}
              bookings={bookings}
            />
          )}
          {activeTab === 'fleet' && <FleetList />}
          {activeTab === 'bookings' && (
            <BookingForm onComplete={handleCreateBooking} isStaffView={true} />
          )}
          {activeTab === 'inspections' && (
            <InspectionsList
              inspections={inspections}
              onCompleteInspection={handleCompleteInspection}
            />
          )}
          {activeTab === 'certificates' && <CertificatesList certificates={certificates} />}
          {activeTab === 'reports' && <Reports inspections={inspections} />}
          {activeTab === 'settings' && (
            <Settings userProfile={userProfile} setUserProfile={setUserProfile} />
          )}
        </main>
      </div>
    </div>
  );
}

