import React, { useState } from 'react';
import BookingForm from './BookingForm';

export default function CustomerDashboard({
  user,
  bookings = [],
  certificates = [],
  fleet = [],
  onLogout,
  onBookInspection,
}) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const activeBookings = bookings.filter((b) => b.status !== 'Completed');
  const validCertificates = certificates.filter(
    (c) => c.status === 'Valid' || c.status === 'Active'
  );

  const handleCompleteBooking = (bookingData) => {
    if (onBookInspection) {
      onBookInspection(bookingData);
    }
    setShowBookingModal(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Customer Header Banner */}
      <div className="bg-[#005691] rounded-xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md">
        <div>
          <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-semibold uppercase">
            Customer Portal
          </span>
          <h1 className="text-2xl font-bold mt-2">
            Welcome, {user?.name || user?.email?.split('@')[0] || 'Valued Customer'}
          </h1>
          <p className="text-slate-200 text-sm mt-1">
            Track your fleet compliance status and upcoming inspection bookings.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="bg-white text-[#005691] hover:bg-slate-100 text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm cursor-pointer transition active:scale-95"
          >
            + Book Inspection
          </button>

          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="bg-red-500/80 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm cursor-pointer transition active:scale-95 border border-white/10"
            >
              Log Out
            </button>
          )}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Registered Vehicles</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{fleet.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Active Bookings</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{activeBookings.length}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase">Valid Certificates</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{validCertificates.length}</h3>
        </div>
      </div>

      {/* Feeds Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Bookings Feed */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h2 className="font-bold text-slate-900 text-sm">Active Bookings</h2>
            <button
              type="button"
              onClick={() => setShowBookingModal(true)}
              className="text-xs text-[#005691] font-bold hover:underline cursor-pointer"
            >
              + New Booking ➔
            </button>
          </div>
          {bookings.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No active bookings found.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookings.slice(0, 3).map((b, i) => (
                <div key={i} className="py-2 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{b.registration || b.vehicle}</p>
                    <p className="text-slate-400">{b.dateSlot || b.date || 'Pending date'}</p>
                  </div>
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-semibold">
                    {b.status || 'Scheduled'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Verified Certificates Feed */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h2 className="font-bold text-slate-900 text-sm">Verified Certificates</h2>
          </div>
          {certificates.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No certificates issued yet.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {certificates.slice(0, 3).map((c, i) => (
                <div key={i} className="py-2 flex justify-between items-center text-xs">
                  <div>
                    <p className="font-bold text-slate-800">{c.certNo || `CERT-${1000 + i}`}</p>
                    <p className="text-slate-400">{c.regNo || c.registration || c.vehicle}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BOOKING FORM MODAL */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl relative my-8">
            <BookingForm
              onComplete={handleCompleteBooking}
              onCancel={() => setShowBookingModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}