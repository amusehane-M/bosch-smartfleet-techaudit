import React from 'react';
import StatCard from '../components/StatCard';

export default function Dashboard({ onNavigateToBooking }) {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, Fleet Administrator</p>
        </div>
        <button 
          onClick={onNavigateToBooking}
          className="bg-[#005691] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004270] transition-colors"
        >
          + Book New Inspection
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard label="Total Fleets" value="124" iconType="truck" />
        <StatCard label="Active Vehicles" value="840" iconType="car" />
        <StatCard label="Bookings Today" value="45" iconType="calendar" />
        <StatCard label="Certs Issued" value="620" iconType="award" />
      </div>

      {/* Charts & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Performance Donut Placeholder */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-base font-bold text-slate-800 mb-4">Inspection Compliance Performance</h2>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-6">
            <div className="relative w-44 h-44 rounded-full border-[14px] border-[#10B981] flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl font-extrabold text-slate-900">77%</span>
                <p className="text-xs text-slate-500 font-semibold">Pass Rate</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                <span className="text-sm font-medium text-slate-700">Passed (77%) - 620</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span>
                <span className="text-sm font-medium text-slate-700">Failed (23%) - 186</span>
              </div>
              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                Total Inspections Conducted: <span className="font-bold text-slate-800">806</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 flex items-center justify-between">
                <span>+ Register New Vehicle</span>
                <span>➔</span>
              </button>
              <button 
                onClick={onNavigateToBooking}
                className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 flex items-center justify-between"
              >
                <span>+ Book Inspection</span>
                <span>➔</span>
              </button>
              <button className="w-full text-left bg-slate-50 hover:bg-slate-100 p-3 rounded-lg border border-slate-200 font-semibold text-sm text-slate-700 flex items-center justify-between">
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