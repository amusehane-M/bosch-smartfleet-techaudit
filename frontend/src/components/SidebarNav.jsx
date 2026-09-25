import React from 'react';

export default function SidebarNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'fleet', label: 'Fleet', icon: '🚛' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'inspections', label: 'Inspections', icon: '✅' },
    { id: 'certificates', label: 'Certificates', icon: '📜' },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 min-h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 px-3 py-4 border-b border-slate-800 mb-6">
          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-sm">
            B
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide text-sm">BOSCH</h1>
            <p className="text-[10px] text-slate-400 font-semibold tracking-wider">SMARTFLEET TECHAUDIT</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
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

      <div className="border-t border-slate-800 pt-4 px-3">
        <div className="text-xs text-slate-500">Logistics & Compliance Portal</div>
      </div>
    </aside>
  );
}