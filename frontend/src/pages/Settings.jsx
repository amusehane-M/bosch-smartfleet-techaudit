import React, { useState } from 'react';
import { User, Save } from 'lucide-react';

export default function Settings({ userProfile, setUserProfile }) {
  const [formData, setFormData] = useState({ ...userProfile });

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfile(formData);
    alert('Profile settings updated successfully!');
  };

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System & Profile Settings</h1>
        <p className="text-sm text-slate-500">Manage your inspector credentials and system preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <User className="w-5 h-5 text-[#005691]" /> Account Information
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#005691]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Role / Designation</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#005691]"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#005691]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="bg-[#005691] hover:bg-[#004270] text-white px-5 py-2.5 rounded-lg text-sm font-bold inline-flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}