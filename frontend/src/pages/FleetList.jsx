import React, { useState } from 'react';
import { Search, Plus, Filter, X } from 'lucide-react';

export default function FleetList() {
  const [dummyFleet, setDummyFleet] = useState([
    { id: 1, reg: 'GP 88 KH ZP', vin: '1HGCR2F83HA001234', model: 'Mercedes-Benz Actros', owner: 'TransLogix SA', status: 'Active' },
    { id: 2, reg: 'CA 123 456', vin: '3VW2B7AJ4HM567890', model: 'Volvo FH16', owner: 'Apex Freight', status: 'Maintenance' },
    { id: 3, reg: 'ND 990 112', vin: '5N1AT2MV8JH234567', model: 'Scania R500', owner: 'Unitrans Fleet', status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    reg: '',
    vin: '',
    model: '',
    owner: '',
    status: 'Active',
  });

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!formData.reg || !formData.vin || !formData.model) return;

    const newVehicle = {
      id: Date.now(),
      ...formData,
    };

    setDummyFleet([newVehicle, ...dummyFleet]);
    setFormData({ reg: '', vin: '', model: '', owner: '', status: 'Active' });
    setIsModalOpen(false);
  };

  const filteredFleet = dummyFleet.filter(
    (item) =>
      item.reg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      {/* Header Bar */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fleet Inventory</h1>
          <p className="text-sm text-slate-500">Manage registered commercial vehicles and fleet units</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#005691] hover:bg-[#00406c] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by registration, VIN, or model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#005691]"
            />
          </div>
          <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium flex items-center gap-2 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
              <th className="py-3 px-4">Registration</th>
              <th className="py-3 px-4">VIN</th>
              <th className="py-3 px-4">Vehicle Model</th>
              <th className="py-3 px-4">Fleet Owner</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {filteredFleet.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-semibold text-slate-900">{item.reg}</td>
                <td className="py-3 px-4 font-mono text-xs">{item.vin}</td>
                <td className="py-3 px-4">{item.model}</td>
                <td className="py-3 px-4">{item.owner}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-slate-200 p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Register New Vehicle</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GP 88 KH ZP"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#005691]"
                  value={formData.reg}
                  onChange={(e) => setFormData({ ...formData, reg: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  VIN (Vehicle Identification No.)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1HGCR2F83HA001234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#005691]"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Model
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mercedes-Benz Actros"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#005691]"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Fleet Owner / Operator
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TransLogix SA"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#005691]"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#005691] hover:bg-[#00406c] text-white rounded-lg text-sm font-semibold transition"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}