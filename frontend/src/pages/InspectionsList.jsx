import React, { useState } from 'react';
import { ClipboardCheck, Award, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function InspectionsList({ inspections = [], onCompleteInspection }) {
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [inspectorName, setInspectorName] = useState('J. van der Merwe');

  // Interactive audit checklist items with defect note fields and critical flags
  const [checklist, setChecklist] = useState([
    { id: 'brakes', label: 'Brake System & ABS Functionality', passed: true, isCritical: true, note: '' },
    { id: 'tires', label: 'Tire Tread Depth & Pressure Verification', passed: true, isCritical: false, note: '' },
    { id: 'lights', label: 'Headlights, Signal Indicators & Brake Lights', passed: true, isCritical: false, note: '' },
    { id: 'emissions', label: 'Exhaust & Emission Compliance Audit', passed: true, isCritical: false, note: '' },
    { id: 'steering', label: 'Steering Mechanism & Suspension Alignment', passed: true, isCritical: true, note: '' },
  ]);

  const [selectedOutcome, setSelectedOutcome] = useState('PASS');

  // Open modal and reset/calculate default state
  const handleOpenModal = (item) => {
    setSelectedAudit(item);
    const initialChecklist = [
      { id: 'brakes', label: 'Brake System & ABS Functionality', passed: true, isCritical: true, note: '' },
      { id: 'tires', label: 'Tire Tread Depth & Pressure Verification', passed: true, isCritical: false, note: '' },
      { id: 'lights', label: 'Headlights, Signal Indicators & Brake Lights', passed: true, isCritical: false, note: '' },
      { id: 'emissions', label: 'Exhaust & Emission Compliance Audit', passed: true, isCritical: false, note: '' },
      { id: 'steering', label: 'Steering Mechanism & Suspension Alignment', passed: true, isCritical: true, note: '' },
    ];
    setChecklist(initialChecklist);
    setSelectedOutcome('PASS');
  };

  const handleToggleCheck = (id) => {
    setChecklist((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, passed: !item.passed } : item
      );

      // Recalculate suggested outcome based on unchecked items
      const failedItems = updated.filter((item) => !item.passed);
      const failedCritical = failedItems.some((item) => item.isCritical);

      if (failedItems.length === 0) {
        setSelectedOutcome('PASS');
      } else if (failedCritical || failedItems.length >= 3) {
        setSelectedOutcome('FAIL');
      } else {
        setSelectedOutcome('PASS WITH CONDITION');
      }

      return updated;
    });
  };

  const handleNoteChange = (id, text) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, note: text } : item))
    );
  };

  const handleFinishInspection = () => {
    if (!selectedAudit) return;

    const passedItems = checklist.filter((item) => item.passed).length;
    const scorePercent = Math.round((passedItems / checklist.length) * 100);

    // Collect defect conditions
    const failedItems = checklist.filter((item) => !item.passed);
    const conditionsSummary = failedItems
      .map((item) => `${item.label}: ${item.note || 'Defect noted'}`)
      .join(' | ');

    const updatedAudit = {
      ...selectedAudit,
      inspector: inspectorName,
      score: `${scorePercent}%`,
      result: selectedOutcome,
      conditions: conditionsSummary,
    };

    // Issue certificate if outcome is PASS or PASS WITH CONDITION
    const issueCert = selectedOutcome === 'PASS' || selectedOutcome === 'PASS WITH CONDITION';

    const certificateData = issueCert
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
          outcome: selectedOutcome,
          conditionsRequired: conditionsSummary || 'None. Vehicle fully compliant.',
          inspectDate: selectedAudit.date || new Date().toISOString().split('T')[0],
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
              const isPassed = item.result === 'Passed' || item.result === 'PASS';
              const isConditional = item.result === 'PASS WITH CONDITION';
              const isFailed = item.result === 'Failed' || item.result === 'FAIL';
              const isPending = item.result === 'Pending';

              const badgeStyle = isPassed
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isConditional
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : isFailed
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-slate-50 text-slate-700 border-slate-200';

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
                        onClick={() => handleOpenModal(item)}
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
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
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

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600">Safety Check System Items</label>
              <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {checklist.map((chk) => (
                  <div key={chk.id} className="p-3 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => handleToggleCheck(chk.id)}
                    >
                      <span className="text-xs font-medium text-slate-800 flex items-center gap-1.5">
                        {chk.label}
                        {chk.isCritical && (
                          <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                            CRITICAL
                          </span>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={chk.passed}
                        onChange={() => {}} // Handled by parent div click
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                      />
                    </div>

                    {/* Show condition / defect input when unchecked */}
                    {!chk.passed && (
                      <div className="pt-2 border-t border-slate-100">
                        <label className="block text-[11px] font-bold text-amber-600 mb-1">
                          Specify Defect / Required Condition:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Pad worn below 2mm, replace within 14 days"
                          value={chk.note}
                          onChange={(e) => handleNoteChange(chk.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-amber-300 rounded bg-amber-50/40 text-slate-800 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome Selection Buttons */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600">Calculated Audit Outcome</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('PASS')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition text-center ${
                    selectedOutcome === 'PASS'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  PASS
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('PASS WITH CONDITION')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition text-center ${
                    selectedOutcome === 'PASS WITH CONDITION'
                      ? 'bg-amber-500 text-white border-amber-600 shadow'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  PASS WITH CONDITION
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('FAIL')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition text-center ${
                    selectedOutcome === 'FAIL'
                      ? 'bg-rose-600 text-white border-rose-700 shadow'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  FAIL
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedAudit(null)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFinishInspection}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-semibold transition inline-flex items-center gap-1.5 cursor-pointer shadow"
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