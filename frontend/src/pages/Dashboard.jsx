import React from 'react';
import StatCard from '../components/StatCard';

export default function Dashboard({ 
  onNavigate, 
  inspections = [], 
  certificates = [], 
  bookings = [], 
  fleet = [] 
}) {
  // 1. DYNAMIC CALCULATIONS
  const totalInspections = inspections.length;

  const passedInspections = inspections.filter(
    (i) => i.result === 'Passed' || i.result === 'PASS' || i.status === 'Passed'
  ).length;

  const conditionalInspections = inspections.filter(
    (i) => i.result === 'PASS WITH CONDITION' || i.status === 'Conditional'
  ).length;

  const failedInspections = inspections.filter(
    (i) => i.result === 'Failed' || i.result === 'FAIL' || i.status === 'Failed'
  ).length;

  // Completed inspections used to determine accuracy rate
  const completedAudits = passedInspections + conditionalInspections + failedInspections;

  // Total passing (Pass + Conditional)
  const passCount = passedInspections + conditionalInspections;

  // Rates for chart rendering
  const passRatePercent = completedAudits > 0 
    ? Math.round((passCount / completedAudits) * 100) 
    : 0;

  const failRatePercent = completedAudits > 0 
    ? 100 - passRatePercent 
    : 0;

  // Count active fleet vehicles from fleet state or unique registrations
  const activeVehiclesCount = fleet.length > 0 
    ? fleet.length 
    : new Set([
        ...inspections.map((i) => i.registration || i.vehicle).filter(Boolean),
        ...bookings.map((b) => b.registration).filter(Boolean)
      ]).size;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
          <p className="text-sm text-slate-500">Live fleet technical audit oversight & performance metrics</p>
        </div>
        <button 
          onClick={() => onNavigate && onNavigate('bookings')}
          className="bg-[#005691] hover:bg-[#004270] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>+ Book New Inspection</span>
        </button>
      </div>

      {/* Dynamic KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard 
          label="Active Fleet Vehicles" 
          value={activeVehiclesCount} 
          iconType="truck" 
        />
        <StatCard 
          label="Total Audits Logged" 
          value={totalInspections} 
          iconType="car" 
        />
        <StatCard 
          label="Active Bookings" 
          value={bookings.length} 
          iconType="calendar" 
        />
        <StatCard 
          label="Certificates Issued" 
          value={certificates.length} 
          iconType="award" 
        />
      </div>

      {/* Charts & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Dynamic Compliance Performance Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-800">Inspection Compliance Performance</h2>
              <p className="text-xs text-slate-500">Calculated live from recorded inspection results</p>
            </div>
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
              {completedAudits} Completed
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            
            {/* DYNAMIC CONIC GRADIENT DONUT (Green for Pass % / Red for Fail %) */}
            <div 
              className="relative w-44 h-44 rounded-full flex items-center justify-center shrink-0 shadow-inner transition-all duration-500"
              style={{
                background: completedAudits > 0 
                  ? `conic-gradient(#10B981 0% ${passRatePercent}%, #EF4444 ${passRatePercent}% 100%)`
                  : '#E2E8F0' // fallback gray if no data
              }}
            >
              {/* Inner Circle Cutout to create the Donut effect */}
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-md">
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-slate-900 block">
                    {completedAudits > 0 ? `${passRatePercent}%` : '0%'}
                  </span>
                  <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    Pass Rate
                  </p>
                </div>
              </div>
            </div>

            {/* Dynamic Breakdown Legend */}
            <div className="space-y-3 w-full sm:w-auto">
              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]"></span>
                  <span className="text-sm font-semibold text-slate-700">
                    Passed / Compliant ({completedAudits > 0 ? passRatePercent : 0}%)
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {passCount}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444]"></span>
                  <span className="text-sm font-semibold text-slate-700">
                    Failed / Defects ({completedAudits > 0 ? failRatePercent : 0}%)
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {failedInspections}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
                Total Inspections Conducted: <span className="font-bold text-slate-800">{completedAudits}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button 
                onClick={() => onNavigate && onNavigate('fleet')}
                className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>🚛 Register New Vehicle</span>
                <span>➔</span>
              </button>
              
              <button 
                onClick={() => onNavigate && onNavigate('bookings')}
                className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>📅 Book Inspection</span>
                <span>➔</span>
              </button>

              <button 
                onClick={() => onNavigate && onNavigate('inspections')}
                className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>📑 Review Inspection Queue</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}