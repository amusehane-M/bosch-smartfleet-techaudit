import React, { useState } from 'react';
import SidebarNav from './components/SidebarNav';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import BookingForm from './pages/BookingForm';
import FleetList from './pages/FleetList';
import InspectionsList from './pages/InspectionsList';
import CertificatesList from './pages/CertificatesList';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // 1. Shared State across the system
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

  // 2. Handlers to handle system transitions
  const handleCreateBooking = (bookingData) => {
    const newBooking = {
      id: `BKN-${Math.floor(1000 + Math.random() * 9000)}`,
      ...bookingData,
      status: 'Confirmed',
    };

    // Add to bookings list
    setBookings((prev) => [newBooking, ...prev]);

    // Automatically create a pending entry in the Inspection Audits feed
    const newInspection = {
      id: `AUD-${Math.floor(8000 + Math.random() * 1000)}`,
      registration: bookingData.registration || 'GP 123-456',
      inspector: 'Pending Assignment',
      date: bookingData.dateSlot ? bookingData.dateSlot.split(' @')[0] : '2026-09-21',
      score: 'Pending',
      result: 'Pending',
    };

    setInspections((prev) => [newInspection, ...prev]);

    // Redirect user to the Inspections tab to view the added booking
    setActiveTab('inspections');
  };

  const handleCompleteInspection = (completedAudit, certificateData) => {
    // Update inspection status
    setInspections((prev) =>
      prev.map((item) => (item.id === completedAudit.id ? completedAudit : item))
    );

    // Generate downloadable certificate
    if (certificateData) {
      setCertificates((prev) => [certificateData, ...prev]);
    }
  };

  if (!isAuthenticated) {
    return <LoginRegister onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <Dashboard onNavigateToBooking={() => setActiveTab('bookings')} />
        )}
        {activeTab === 'fleet' && <FleetList />}
        {activeTab === 'bookings' && (
          <BookingForm onComplete={handleCreateBooking} />
        )}
        {activeTab === 'inspections' && (
          <InspectionsList 
            inspections={inspections} 
            onCompleteInspection={handleCompleteInspection} 
          />
        )}
        {activeTab === 'certificates' && (
          <CertificatesList certificates={certificates} />
        )}
      </main>
    </div>
  );
}