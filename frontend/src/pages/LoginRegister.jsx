import React, { useState } from 'react';

export default function LoginRegister({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'inspector' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Left Column: Brand & Value Prop */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#003B63] to-[#0F172A] p-12 flex-col justify-between relative overflow-hidden">
        <div className="z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="bg-red-600 text-white px-3 py-1 font-bold rounded tracking-wider">BOSCH</span>
            <span className="text-xl font-bold tracking-tight">SMARTFLEET TECHAUDIT</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight mb-4">
            Digital Vehicle Inspection Booking, Onboarding & Certification System
          </h1>
          <p className="text-slate-300 text-base max-w-md mb-8">
            Streamline fleet auditing, manage instant digital compliance certificates, and run real-time analytics.
          </p>

          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold">✓</span>
              <span>Automated Fleet Onboarding</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold">✓</span>
              <span>Instant Dynamic Certificates</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold">✓</span>
              <span>Real-Time Compliance Analytics</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 z-10">
          Powered by Bosch SmartFleet Tech • Approved Architectural Blueprint
        </div>
      </div>

      {/* Right Column: Credentials Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-900">
        <div className="w-full max-w-md bg-slate-800/80 p-8 rounded-2xl border border-slate-700/50 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-1">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            {isRegister ? 'Register your user profile to start.' : 'Please enter your credentials.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="email@company.co.za"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#005691] hover:bg-[#004270] text-white font-semibold py-3 rounded-lg text-sm shadow-md transition-colors mt-2"
            >
              {isRegister ? 'REGISTER PROFILE' : 'LOGIN TO PORTAL'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-sky-400 hover:underline font-medium"
            >
              {isRegister ? 'Already have an account? Login Here' : 'Need an account? Register Here'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}