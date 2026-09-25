import React, { useState } from 'react';
import { ClipboardCheck, Award } from 'lucide-react';

export default function InspectionsList({ inspections = [], onCompleteInspection }) {
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [inspectorName, setInspectorName] = useState('J. van der Merwe');

  // Interactive audit checklist items
  const [checklist, setChecklist] = useState([
    { id: 'brakes', label: 'Brake System & ABS Functionality', passed: true },
    { id: 'tires', label: 'Tire Tread Depth & Pressure Verification', passed: true },
    { id: 'lights', label: 'Headlights, Signal Indicators & Brake Lights', passed: true },
    { id: 'emissions', label: 'Exhaust & Emission Compliance Audit', passed: true },
    { id: 'steering', label: 'Steering Mechanism & Suspension Alignment', passed: true },
  ]);

  const handleToggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, passed: !item.passed } : item))
    );
  };

  const handleFinishInspection = () => {
    if (!selectedAudit) return;

    // Calculate score percentage based on checklist items passed
    const passedItems = checklist.filter((item) => item.passed).length;
    const scorePercent = Math.round((passedItems / checklist.length) * 100);
    const auditOutcome = scorePercent >= 70 ? 'Passed' : 'Failed';

    const updatedAudit = {
      ...selectedAudit,
      inspector: inspectorName,
      score: `${scorePercent}%`,
      result: auditOutcome,
    };

    // Construct certificate data if the vehicle passes
    const certificateData =
      auditOutcome === 'Passed'
        ? {
            certNo: `CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
            engineNo: '4HK1-982341',
            makeModel: 'Fleet Vehicle',
            year: '2023',
            vehicleType: 'Commercial / Logistics',
            odometer: '85,400 km',
            owner: 'SmartFleet Logistics',
            regNo: selectedAudit.vehicle || selectedAudit.registration,
            category: 'B',
            outcome: 'PASS',
            inspectDate: selectedAudit.date,
            nextDueDate: '2027-09-21',
            location: 'Bosch Service Center - Midrand',
            inspectionType: 'Technical Safety Audit',
            inspectorName: inspectorName,
            inspectorId: 'TECH-8842',
            authorisedName: 'M. N. Muwanguzi',
          }
        : null;

    if (onCompleteInspection) {
      onCompleteInspection(updatedAudit, certificateData);
    }

    setSelectedAudit(null);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Inspection Audits</h1>
        <p className="text-sm text-slate-500">
          Live feed of technical safety audits and compliance verification
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3.5">AUDIT ID</th>
              <th className="px-6 py-3.5">VEHICLE</th>
              <th className="px-6 py-3.5">INSPECTOR</th>
              <th className="px-6 py-3.5">DATE</th>
              <th className="px-6 py-3.5">SCORE</th>
              <th className="px-6 py-3.5">AUDIT RESULT</th>
              <th className="px-6 py-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inspections.map((item) => {
              const isPassed = item.result === 'Passed';
              const isFailed = item.result === 'Failed';
              const isPending = item.result === 'Pending';

              const badgeStyle = isPassed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isFailed
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-amber-50 text-amber-700 border-amber-200';

              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-semibold text-blue-600">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-800">
                    {item.vehicle || item.registration}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{item.inspector}</td>
                  <td className="px-6 py-4 text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{item.score}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 border rounded-full text-xs font-semibold ${badgeStyle}`}>
                      {item.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isPending ? (
                      <button
                        onClick={() => setSelectedAudit(item)}
                        className="bg-[#1B365D] hover:bg-blue-900 text-white px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <ClipboardCheck className="w-3.5 h-3.5" /> Conduct Audit
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Completed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CONDUCT AUDIT MODAL */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Perform Safety Audit: {selectedAudit.vehicle || selectedAudit.registration}
                </h3>
                <p className="text-xs text-slate-500">Reference Number: {selectedAudit.id}</p>
              </div>
              <button
                onClick={() => setSelectedAudit(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Assigned Technician / Inspector</label>
              <input
                type="text"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-600">Safety Check System Items</label>
              <div className="space-y-2 bg-slate-50 p-4 rounded-lg border border-slate-200">
                {checklist.map((chk) => (
                  <label
                    key={chk.id}
                    className="flex items-center justify-between p-2.5 rounded-md bg-white border border-slate-200 cursor-pointer hover:border-slate-300 transition"
                  >
                    <span className="text-xs font-medium text-slate-700">{chk.label}</span>
                    <input
                      type="checkbox"
                      checked={chk.passed}
                      onChange={() => handleToggleCheck(chk.id)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedAudit(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFinishInspection}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-semibold transition inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" /> Complete & Submit Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}