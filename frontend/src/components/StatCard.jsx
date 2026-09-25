import React from 'react';

export default function StatCard({ label, value, iconType }) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-extrabold text-slate-900 mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 text-xl font-bold">
        {iconType === 'truck' && '🚛'}
        {iconType === 'car' && '🚘'}
        {iconType === 'calendar' && '📅'}
        {iconType === 'award' && '🎖️'}
      </div>
    </div>
  );
}