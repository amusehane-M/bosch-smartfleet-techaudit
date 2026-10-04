import React, { useState } from 'react';
import { Truck, Calendar, ClipboardCheck, CheckCircle, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';

export default function BookingForm({ onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const initialFormState = {
    // Step 1: Vehicle & Customer
    customer: '',
    registration: '',
    vin: '',

    // Step 2: Date, Time & Location
    date: getTodayString(),
    timeSlot: '09:00 AM',
    station: 'Bosch Service Center - Midrand',

    // Step 3: Inspection Type & Notes
    inspectionType: 'Routine Safety Audit',
    notes: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.customer.trim()) {
      newErrors.customer = 'Customer/Owner name is required.';
    }
    if (!formData.registration.trim()) {
      newErrors.registration = 'Vehicle registration number is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep1 = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleConfirm = () => {
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    if (onComplete) {
      onComplete(formData);
    }
  };

  const handleStepClick = (targetStep) => {
    if (targetStep < step) {
      setStep(targetStep);
    } else if (targetStep > step) {
      if (step === 1 && validateStep1()) {
        setStep(targetStep);
      }
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Book Vehicle Inspection</h1>
        <p className="text-sm text-slate-500">
          Schedule an audit session across accredited Bosch testing centers.
        </p>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <button
          type="button"
          onClick={() => handleStepClick(1)}
          className={`flex items-center gap-2 text-xs font-bold transition-colors ${
            step >= 1 ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
              step >= 1 ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            1
          </span>
          Select Vehicle
        </button>

        <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />

        <button
          type="button"
          onClick={() => handleStepClick(2)}
          className={`flex items-center gap-2 text-xs font-bold transition-colors ${
            step >= 2 ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
              step >= 2 ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            2
          </span>
          Date & Time Slot
        </button>

        <div className={`flex-1 h-0.5 ${step === 3 ? 'bg-blue-600' : 'bg-slate-200'}`} />

        <button
          type="button"
          onClick={() => handleStepClick(3)}
          className={`flex items-center gap-2 text-xs font-bold transition-colors ${
            step === 3 ? 'text-blue-600' : 'text-slate-400'
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
              step === 3 ? 'bg-blue-600' : 'bg-slate-300'
            }`}
          >
            3
          </span>
          Inspection Type & Notes
        </button>
      </div>

      {/* WIZARD CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-6">
        {/* STEP 1: SELECT VEHICLE & CUSTOMER */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" /> Step 1: Select Vehicle & Customer
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Customer / Owner Name (Company or Individual) *
              </label>
              <input
                type="text"
                name="customer"
                placeholder="e.g. John Doe / Bosch Logistics"
                value={formData.customer}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-medium text-slate-800 ${
                  errors.customer ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                }`}
              />
              {errors.customer && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.customer}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none font-semibold ${
                    errors.registration ? 'border-red-500 focus:border-red-500 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.registration && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors.registration}
                  </p>
                )}
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 font-mono text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-between pt-4">
              {onCancel ? (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={handleNextStep1}
                className="bg-[#1B365D] hover:bg-blue-900 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                Next: Date & Time Slot <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: DYNAMIC CALENDAR & TIME SLOT */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" /> Step 2: Interactive Date & Schedule
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Select Inspection Date *
                </label>
                <input
                  type="date"
                  name="date"
                  min={getTodayString()}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white cursor-pointer font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Time Slot
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800"
                >
                  <option value="08:30 AM">08:30 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Testing Station Location
                </label>
                <select
                  name="station"
                  value={formData.station}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800"
                >
                  <option value="Bosch Service Center - Midrand">Bosch Service Center - Midrand</option>
                  <option value="Bosch Service Center - Sandton">Bosch Service Center - Sandton</option>
                  <option value="Bosch Service Center - Pretoria Central">Bosch Service Center - Pretoria Central</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-[#1B365D] hover:bg-blue-900 text-white px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                Next: Inspection Type & Notes <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: INSPECTION TYPE & NOTES */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-blue-600" /> Step 3: Inspection Type & Pre-Audit Notes
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Inspection Type
              </label>
              <select
                name="inspectionType"
                value={formData.inspectionType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-slate-800"
              >
                <option value="Routine Safety Audit">Routine Safety Audit</option>
                <option value="Pre-Licensing Audit">Pre-Licensing Audit</option>
                <option value="Post-Maintenance Audit">Post-Maintenance Audit</option>
                <option value="Comprehensive Compliance Inspection">Comprehensive Compliance Inspection</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Additional Notes / Instructions
              </label>
              <textarea
                name="notes"
                rows="3"
                placeholder="Add special instructions, observed defect flags, or booking requirements..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-slate-800"
              />
            </div>

            {/* DYNAMIC SUMMARY PREVIEW */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-700 uppercase tracking-wider mb-2 border-b border-slate-200 pb-1">
                Booking Summary Preview
              </div>
              <p className="flex justify-between">
                <span className="text-slate-500">Customer / Owner:</span>
                <span className="font-semibold text-slate-800">{formData.customer || 'N/A'}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Registration & VIN:</span>
                <span className="font-semibold text-slate-800">
                  {formData.registration} {formData.vin ? `| ${formData.vin}` : ''}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Schedule & Location:</span>
                <span className="font-semibold text-slate-800">
                  {formData.date} @ {formData.timeSlot} ({formData.station})
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-slate-500">Type:</span>
                <span className="font-semibold text-slate-800">{formData.inspectionType}</span>
              </p>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
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