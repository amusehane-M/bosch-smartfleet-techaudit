import React, { useState } from 'react';
import { Truck, Calendar, MapPin, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BookingForm({ onComplete }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    registration: '',
    vin: '',
    dateSlot: '2026-09-22 @ 09:00 AM',
    station: 'Bosch Service Center - Midrand',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    if (!formData.registration) {
      alert('Please enter a vehicle registration number.');
      return;
    }

    if (onComplete) {
      onComplete(formData);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Book Vehicle Inspection</h1>
        <p className="text-sm text-slate-500">
          Schedule an audit session across accredited Bosch testing centers.
        </p>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 max-w-4xl">
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 1 ? 'bg-blue-600' : 'bg-slate-300'}`}>1</span>
          Select Vehicle
        </div>
        <div className="flex-1 h-0.5 bg-slate-200" />
        <div className={`flex items-center gap-2 text-xs font-bold ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step >= 2 ? 'bg-blue-600' : 'bg-slate-300'}`}>2</span>
          Schedule Slot
        </div>
        <div className="flex-1 h-0.5 bg-slate-200" />
        <div className={`flex items-center gap-2 text-xs font-bold ${step === 3 ? 'text-blue-600' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${step === 3 ? 'bg-blue-600' : 'bg-slate-300'}`}>3</span>
          Confirm Booking
        </div>
      </div>

      {/* WIZARD CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-4xl space-y-6">
        
        {/* STEP 1: VEHICLE DETAILS */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" /> Step 1: Vehicle Identification
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Vehicle Registration Number *
                </label>
                <input
                  type="text"
                  name="registration"
                  placeholder="e.g. GP 123-456"
                  value={formData.registration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Vehicle Identification Number (VIN)
                </label>
                <input
                  type="text"
                  name="vin"
                  placeholder="e.g. 1HGCM82633A004352"
                  value={formData.vin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  if (!formData.registration) {
                    alert('Please enter a vehicle registration number first.');
                    return;
                  }
                  setStep(2);
                }}
                className="bg-[#1B365D] hover:bg-blue-900 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                Next: Schedule Slot <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCHEDULE & LOCATION */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Step 2: Testing Station & Schedule
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Accredited Testing Station
                </label>
                <select
                  name="station"
                  value={formData.station}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="Bosch Service Center - Midrand">Bosch Service Center - Midrand</option>
                  <option value="Bosch Service Center - Sandton">Bosch Service Center - Sandton</option>
                  <option value="Bosch Service Center - Pretoria Central">Bosch Service Center - Pretoria Central</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Date & Time Slot
                </label>
                <select
                  name="dateSlot"
                  value={formData.dateSlot}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="2026-09-22 @ 09:00 AM">2026-09-22 @ 09:00 AM</option>
                  <option value="2026-09-22 @ 11:30 AM">2026-09-22 @ 11:30 AM</option>
                  <option value="2026-09-22 @ 02:00 PM">2026-09-22 @ 02:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-[#1B365D] hover:bg-blue-900 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                Next: Review & Confirm <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUMMARY & CONFIRM */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
              Confirm Booking Summary
            </h2>

            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 space-y-3 text-sm">
              <p className="flex justify-between">
                <span className="text-slate-500">Registration:</span>
                <span className="font-bold text-slate-800">{formData.registration || 'N/A'}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">VIN:</span>
                <span className="font-semibold text-slate-800 font-mono">{formData.vin || '1HGCM82633A004352'}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-semibold text-slate-800">{formData.dateSlot}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Station:</span>
                <span className="font-semibold text-slate-800">{formData.station}</span>
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                onClick={handleConfirm}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" /> Confirm & Create Booking
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}