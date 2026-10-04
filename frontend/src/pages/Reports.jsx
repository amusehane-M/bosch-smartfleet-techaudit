import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle, Download } from 'lucide-react';

export default function Reports({ inspections = [] }) {
  const total = inspections.length;
  const passed = inspections.filter((i) => i.result === 'Passed' || i.result === 'PASS').length;
  const failed = inspections.filter((i) => i.result === 'Failed' || i.result === 'FAIL').length;
  const pending = inspections.filter((i) => i.result === 'Pending').length;

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-sm text-slate-500">Fleet performance summaries and inspection analytics</p>
        </div>
        <button className="bg-[#005691] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004270] flex items-center gap-2">
          <Download className="w-4 h-4" /> Export Summary PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Audits</p>
          <p className="text-2xl font-black text-slate-800 mt-1">{total}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-emerald-600 uppercase">Passed</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{passed}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-rose-600 uppercase">Failed</p>
          <p className="text-2xl font-black text-rose-700 mt-1">{failed}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-amber-600 uppercase">Pending</p>
          <p className="text-2xl font-black text-amber-700 mt-1">{pending}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#005691]" /> Detailed Inspection Breakdown
        </h3>
        <div className="divide-y divide-slate-100">
          {inspections.map((item) => (
            <div key={item.id} className="py-3 flex justify-between items-center text-sm">
              <div>
                <p className="font-bold text-slate-800">{item.registration}</p>
                <p className="text-xs text-slate-500">Inspector: {item.inspector} | Date: {item.date}</p>
              </div>
              <div className="text-right">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  item.result === 'Passed' ? 'bg-emerald-100 text-emerald-800' :
                  item.result === 'Failed' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.result}
                </span>
                <p className="text-xs font-semibold text-slate-600 mt-1">Score: {item.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}