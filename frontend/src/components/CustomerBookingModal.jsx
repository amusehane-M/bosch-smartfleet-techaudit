import React, { useState } from 'react';

export default function CustomerBookingModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    registration: '',
    vin: '',
    station: 'Bosch Service Center - Midrand',
    dateSlot: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.registration || !formData.dateSlot) return;
    onSubmit(formData);
    setFormData({ registration: '', vin: '', station: 'Bosch Service Center - Midrand', dateSlot: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-800">Book Inspection Slot</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Vehicle Registration</label>
            <input
              type="text"
              required
              placeholder="e.g. GP 88 KH ZP"
              value={formData.registration}
              onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#005691] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">VIN Number (Optional)</label>
            <input
              type="text"
              placeholder="17-digit VIN number"
              value={formData.vin}
              onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#005691] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Service Station</label>
            <select
              value={formData.station}
              onChange={(e) => setFormData({ ...formData, station: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#005691] outline-none bg-white"
            >
              <option value="Bosch Service Center - Midrand">Bosch Service Center - Midrand</option>
              <option value="Bosch Service Center - Pretoria">Bosch Service Center - Pretoria</option>
              <option value="Mokopane Test Centre">Mokopane Test Centre</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Preferred Date & Time Slot</label>
            <input
              type="datetime-local"
              required
              value={formData.dateSlot}
              onChange={(e) => setFormData({ ...formData, dateSlot: e.target.value })}
              className="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#005691] outline-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#005691] hover:bg-[#00406c] text-white font-bold py-2.5 rounded-lg transition"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}