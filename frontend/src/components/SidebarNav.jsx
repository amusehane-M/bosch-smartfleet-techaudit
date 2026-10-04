import React, { useState } from 'react';

export default function SidebarNav({ activeTab, setActiveTab, onLogout, user }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Added 'reports' and 'settings' to the nav items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'fleet', label: 'Fleet', icon: '🚛' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'inspections', label: 'Inspections', icon: '✅' },
    { id: 'certificates', label: 'Certificates', icon: '📜' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  // Default fallback user if none passed in
  const currentUser = user || {
    name: 'J. van der Merwe',
    role: 'Inspector',
    email: 'j.vandermerwe@bosch.co.za',
  };

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 min-h-screen p-4 flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* BOSCH LOGO HEADER */}
        <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-6">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm">
            B
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-sm">BOSCH</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider">
              SMARTFLEET TECHAUDIT
            </p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#005691] text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* FOOTER & PROFILE / LOGOUT SECTION */}
      <div className="border-t border-slate-800 pt-4 px-2 space-y-3 relative">
        {/* LOGOUT / PROFILE POPUP MENU */}
        {showProfileMenu && (
          <div className="absolute bottom-16 left-2 right-2 bg-slate-800 border border-slate-700 rounded-xl p-2 shadow-2xl space-y-1 z-50">
            <div className="px-3 py-2 border-b border-slate-700/60">
              <p className="text-xs font-bold text-white">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
            </div>
            
            <button
              onClick={() => {
                setActiveTab('settings');
                setShowProfileMenu(false);
              }}
              className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-700 rounded-md transition flex items-center gap-2 cursor-pointer"
            >
              ⚙️ Account Settings
            </button>

            <button
              onClick={() => {
                if (onLogout) {
                  onLogout();
                } else {
                  alert('Logged out successfully.');
                  window.location.reload();
                }
              }}
              className="w-full text-left px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 rounded-md transition flex items-center gap-2 cursor-pointer"
            >
              🚪 Log Out
            </button>
          </div>
        )}

        {/* PROFILE BUTTON TOGGLE */}
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 transition text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#005691] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.role || 'Inspector'}</p>
            </div>
          </div>
          <span className="text-xs text-slate-400">{showProfileMenu ? '▲' : '⋮'}</span>
        </button>

        <div className="text-[10px] text-slate-500 px-1 text-center">
          Logistics & Compliance Portal
        </div>
      </div>
    </aside>
  );
}