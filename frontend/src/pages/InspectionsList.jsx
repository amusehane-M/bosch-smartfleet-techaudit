import React, { useState } from 'react';
import { ClipboardCheck, Award, Save, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export default function InspectionsList({ inspections = [], onCompleteInspection }) {
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [inspectorName, setInspectorName] = useState('J. van der Merwe');
  const [overallComments, setOverallComments] = useState('');

  // 16 Standard Vehicle Inspection Checkpoints
  const defaultChecklist = [
    { id: 'brakes_service', label: '1. Service Braking System Performance', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'brakes_park', label: '2. Parking Brake Mechanism & Cable', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'steering_mech', label: '3. Steering Box, Linkage & Power Steering', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'suspension', label: '4. Suspension Springs, Struts & Shock Absorbers', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'tires_tread', label: '5. Tire Tread Depth & Pressure (All 4 + Spare)', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'wheels_rims', label: '6. Wheels, Rims & Lug Nut Tightness', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'headlights', label: '7. Headlights (High / Low Beam & Alignment)', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'signal_lights', label: '8. Indicator Signals, Hazards & Brake Lights', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'windshield_wipers', label: '9. Windshield, Mirrors & Wiper Blade Condition', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'exhaust_system', label: '10. Exhaust System Integrity & Emission Control', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'seatbelts', label: '11. Seatbelts & Restraint Anchorages', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'engine_leaks', label: '12. Engine Oil, Coolant & Fluid Leak Inspection', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'battery_elec', label: '13. Battery Mounting, Terminals & Wiring', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'chassis_frame', label: '14. Chassis Structure & Frame Corrosion Check', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: true },
    { id: 'horn_dash', label: '15. Horn & Dashboard Warning Instruments', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
    { id: 'safety_gear', label: '16. Emergency Safety Kit (Triangle & Fire Ext.)', status: 'PASS', observation: 'Good Condition', customNote: '', isCritical: false },
  ];

  const [checklist, setChecklist] = useState(defaultChecklist);
  const [selectedOutcome, setSelectedOutcome] = useState('PASS');

  // Observation Dropdown Standard Preset Options
  const observationOptions = [
    'Good Condition',
    'Satisfactory / Normal Wear',
    'Minor Wear - Monitor',
    'Needs Servicing / Adjustment',
    'Requires Immediate Repair / Replacement',
    'Not Applicable (N/A)',
    'Custom Comment'
  ];

  // Open modal and reset/populate inspection data dynamically
  const handleOpenModal = (item) => {
    setSelectedAudit(item);
    setChecklist(defaultChecklist);
    setOverallComments('');
    setSelectedOutcome(item.result && item.result !== 'Pending' ? item.result : 'PASS');
  };

  const handleStatusChange = (id, newStatus) => {
    setChecklist((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          const autoObs = newStatus === 'PASS' 
            ? 'Good Condition' 
            : newStatus === 'FAIL' 
            ? 'Requires Immediate Repair / Replacement' 
            : 'Not Applicable (N/A)';
          return { ...item, status: newStatus, observation: autoObs };
        }
        return item;
      });

      // Recalculate audit outcome based on failures
      const failedItems = updated.filter((item) => item.status === 'FAIL');
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

  const handleObservationChange = (id, observation) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, observation } : item))
    );
  };

  const handleCustomNoteChange = (id, customNote) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, customNote } : item))
    );
  };

  const handleSaveDraft = () => {
    const regNo = selectedAudit?.registration || selectedAudit?.vehicle || 'N/A';
    alert(`Audit Draft saved successfully for vehicle ${regNo}.`);
  };

  const handleFinishInspection = () => {
    if (!selectedAudit) return;

    const passedItems = checklist.filter((item) => item.status === 'PASS').length;
    const totalApplicable = checklist.filter((item) => item.status !== 'N/A').length;
    const scorePercent = totalApplicable > 0 ? Math.round((passedItems / totalApplicable) * 100) : 100;

    const failedItems = checklist.filter((item) => item.status === 'FAIL');
    const conditionsSummary = failedItems
      .map((item) => `${item.label}: ${item.observation}${item.customNote ? ` (${item.customNote})` : ''}`)
      .join(' | ');

    // Get dynamic vehicle details from selectedAudit
    const vehicleReg = selectedAudit.registration || selectedAudit.vehicle || 'UNREGISTERED';
    const vehicleModel = selectedAudit.model || selectedAudit.makeModel || selectedAudit.vehicleType || 'Fleet Vehicle';

    const updatedAudit = {
      ...selectedAudit,
      inspector: inspectorName,
      score: `${scorePercent}%`,
      result: selectedOutcome,
      conditions: conditionsSummary,
      overallComments: overallComments,
    };

    // GENERATE CERTIFICATE FOR ALL OUTCOMES (PASS, PASS WITH CONDITION, AND FAIL)
    const certificateData = {
      certNo: `CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
      engineNo: selectedAudit.engineNo || '4HK1-982341',
      makeModel: vehicleModel,
      year: selectedAudit.year || '2023',
      vehicleType: selectedAudit.category || 'Commercial / Fleet',
      odometer: selectedAudit.odometer || '85,400 km',
      owner: selectedAudit.customer || selectedAudit.owner || 'Customer / Fleet Owner',
      regNo: vehicleReg,
      category: selectedAudit.category || 'B',
      outcome: selectedOutcome, // PASS, PASS WITH CONDITION, or FAIL
      conditionsRequired: conditionsSummary || (selectedOutcome === 'PASS' ? 'None. Vehicle fully compliant.' : 'Defects recorded on inspection audit.'),
      overallComments: overallComments || 'Inspection audit concluded.',
      inspectDate: selectedAudit.date || new Date().toISOString().split('T')[0],
      nextDueDate: selectedOutcome === 'FAIL' ? 'Immediate Re-Test Required' : '2027-10-04',
      location: selectedAudit.station || 'Bosch Service Center - Midrand',
      inspectionType: selectedAudit.inspectionType || 'Technical Safety Audit',
      inspectorName: inspectorName,
      inspectorId: 'TECH-8842',
      authorisedName: 'M. N. Muwanguzi',
    };

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
                    {item.registration || item.vehicle} {item.model ? `(${item.model})` : ''}
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
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-xs font-medium transition cursor-pointer"
                      >
                        View / Edit
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CONDUCT 16-POINT AUDIT MODAL */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full p-6 space-y-5 max-h-[92vh] overflow-y-auto">
            
            {/* DYNAMIC AUDIT HEADER */}
            <div className="border-b border-slate-200 pb-4 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Vehicle Safety Audit</span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  Inspection Audit Vehicle : {selectedAudit.registration || selectedAudit.vehicle || 'N/A'} {selectedAudit.model || selectedAudit.makeModel ? `(${selectedAudit.model || selectedAudit.makeModel})` : ''}
                </h2>
                <p className="text-xs text-slate-500">Audit Reference: {selectedAudit.id} | Date: {selectedAudit.date || '2026-10-04'}</p>
              </div>
              <button
                onClick={() => setSelectedAudit(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            {/* INSPECTOR NAME */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center gap-4">
              <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Inspector Name:</label>
              <input
                type="text"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-md text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 16 CHECKPOINT AUDIT LIST */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800">16-Point Safety Checklist</h3>
                <span className="text-xs text-slate-500">16 System Checkpoints</span>
              </div>

              <div className="space-y-3 bg-slate-50/50 p-3 rounded-xl border border-slate-200">
                {checklist.map((item) => (
                  <div key={item.id} className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-sm space-y-3">
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        {item.isCritical && (
                          <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                            CRITICAL
                          </span>
                        )}
                      </div>

                      {/* STATUS TOGGLE BUTTONS (PASS / FAIL / N/A) */}
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, 'PASS')}
                          className={`px-3 py-1 rounded text-xs font-bold transition ${
                            item.status === 'PASS'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          PASS
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, 'FAIL')}
                          className={`px-3 py-1 rounded text-xs font-bold transition ${
                            item.status === 'FAIL'
                              ? 'bg-rose-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          FAIL
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(item.id, 'N/A')}
                          className={`px-3 py-1 rounded text-xs font-bold transition ${
                            item.status === 'N/A'
                              ? 'bg-slate-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          N/A
                        </button>
                      </div>
                    </div>

                    {/* OBSERVATIONS & NOTES (DROPDOWN) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Observation / Note Preset
                        </label>
                        <select
                          value={item.observation}
                          onChange={(e) => handleObservationChange(item.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          {observationOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                          Specific Comment / Defect Details
                        </label>
                        <input
                          type="text"
                          placeholder="Add custom notes..."
                          value={item.customNote}
                          onChange={(e) => handleCustomNoteChange(item.id, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-md bg-white text-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* OVERALL INSPECTOR COMMENTS */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-700">Overall Inspector Comments</label>
              <textarea
                rows="3"
                placeholder="Enter final summary, overall vehicle assessment, or general recommendations..."
                value={overallComments}
                onChange={(e) => setOverallComments(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* OVERALL AUDIT OUTCOME SELECTION */}
            <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block">Final Audit Outcome & Certificate Result</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('PASS')}
                  className={`py-2 px-2 text-xs font-bold rounded-lg border transition text-center ${
                    selectedOutcome === 'PASS'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
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
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
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
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  FAIL
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS: SAVE DRAFT & SUBMIT */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 inline-flex items-center gap-1.5 transition"
              >
                <Save className="w-4 h-4 text-slate-500" /> Save Draft
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedAudit(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFinishInspection}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow"
                >
                  <Award className="w-4 h-4" /> Submit Audit & Issue Certificate
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}