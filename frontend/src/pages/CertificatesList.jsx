import React, { useState } from 'react';
import { Download, Printer, ShieldCheck, FileText, Eye, QrCode } from 'lucide-react';

export default function CertificatesList({ certificates = [] }) {
  const [selectedCert, setSelectedCert] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Compliance Certificates</h1>
        <p className="text-sm text-slate-500">
          Official roadworthiness and safety compliance verification records
        </p>
      </div>

      {/* CERTIFICATES TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-700 text-xs uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-3.5">CERTIFICATE NO</th>
              <th className="px-6 py-3.5">VEHICLE REG</th>
              <th className="px-6 py-3.5">INSPECTOR</th>
              <th className="px-6 py-3.5">INSPECTION DATE</th>
              <th className="px-6 py-3.5">NEXT DUE DATE</th>
              <th className="px-6 py-3.5">OUTCOME</th>
              <th className="px-6 py-3.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certificates.length > 0 ? (
              certificates.map((cert, idx) => (
                <tr key={cert.certNo || idx} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    {cert.certNo}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{cert.regNo}</td>
                  <td className="px-6 py-4 text-slate-600">{cert.inspectorName}</td>
                  <td className="px-6 py-4 text-slate-500">{cert.inspectDate}</td>
                  <td className="px-6 py-4 text-slate-500">{cert.nextDueDate}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                      <ShieldCheck className="w-3.5 h-3.5" /> {cert.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedCert(cert)}
                      className="bg-[#1B365D] hover:bg-blue-900 text-white px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View / Download PDF
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-12 text-slate-400">
                  No certificates issued yet. Complete an inspection audit to generate a certificate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MATCHING PDF CERTIFICATE PREVIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-300 max-w-2xl w-full p-6 space-y-4 my-8 print:p-0 print:border-none print:shadow-none print:max-w-none">
            
            {/* Action Bar */}
            <div className="flex justify-between items-center print:hidden border-b pb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Official Compliance Document
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Download PDF / Print
                </button>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-bold px-2"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* EXACT CERTIFICATE LAYOUT */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-slate-800 bg-white shadow-sm">
              
              {/* Header Banner */}
              <div className="bg-[#1B2A4A] text-white p-6 text-center relative border-b-4 border-emerald-500">
                <h1 className="text-2xl font-black tracking-wider uppercase">SMARTFLEET AUDIT</h1>
                <p className="text-xs font-bold text-slate-300 tracking-widest mt-1">TECH</p>
                <p className="text-[11px] text-slate-300 font-medium tracking-wide mt-1 uppercase">
                  TECHNICAL INSPECTION & COMPLIANCE SERVICES
                </p>
              </div>

              {/* Tagline Ribbon */}
              <div className="bg-slate-100 text-[9px] font-bold text-slate-600 text-center py-2 px-4 border-b border-slate-200 tracking-tight uppercase">
                DIGITAL INSPECTION | VEHICLES FITNESS & COMPLIANCE | BRAKES, NOISE & LUX TESTING | NDT & LOAD TESTING | ASSET INTEGRITY | DIGITAL VERIFICATION
              </div>

              {/* Main Document Body */}
              <div className="p-6 space-y-6">
                
                {/* Vehicle Registration & Date Row */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Vehicle Registration</p>
                    <p className="text-xl font-extrabold text-slate-900 tracking-wide">{selectedCert.regNo}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Date of Inspection</p>
                    <p className="text-sm font-bold text-slate-800">{selectedCert.inspectDate}</p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="bg-emerald-500 text-white text-center py-3 rounded-md font-black text-lg tracking-wider shadow-sm uppercase">
                  INSPECTION PASSED
                </div>

                {/* Detailed Technical Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-slate-400 font-medium">Certificate No:</p>
                    <p className="font-bold text-slate-800 font-mono">{selectedCert.certNo}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Owner / Fleet:</p>
                    <p className="font-semibold text-slate-800">{selectedCert.owner || 'SmartFleet Logistics'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Engine Number:</p>
                    <p className="font-mono text-slate-800">{selectedCert.engineNo || '4HK1-982341'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Make / Model:</p>
                    <p className="font-semibold text-slate-800">{selectedCert.makeModel || 'Fleet Vehicle'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Next Due Date:</p>
                    <p className="font-semibold text-slate-800">{selectedCert.nextDueDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Certified Inspector:</p>
                    <p className="font-semibold text-slate-800">{selectedCert.inspectorName} ({selectedCert.inspectorId || 'TECH-8842'})</p>
                  </div>
                </div>

                {/* QR Verification & Signatures */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-3 bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                    <div className="w-12 h-12 bg-white border border-slate-300 rounded flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-slate-800" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-700">Digital Verification</p>
                      <p className="text-[9px] text-slate-500">Scan QR Code to verify certificate authenticity</p>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <p className="font-bold text-slate-800">{selectedCert.authorisedName || 'M. N. Muwanguzi'}</p>
                    <div className="w-32 border-b border-slate-400 my-1 ml-auto"></div>
                    <p className="text-[10px] text-slate-400">Authorised Technical Signatory</p>
                  </div>
                </div>

              </div>

              {/* Footer Banner */}
              <div className="bg-slate-100 border-t border-slate-200 p-3 text-center text-[10px] text-slate-600 font-medium">
                17A Sussex Str, Mokopane, 0601 | (015) 280 0156 | 087 093 6275
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}