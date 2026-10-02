import React, { useState } from 'react';
import { Download, Printer, ArrowLeft, X, Eye, FileText, ShieldCheck, Search } from 'lucide-react';
import html2pdf from 'html2pdf.js';

export default function CertificatesList({ certificates = [] }) {
  const [selectedCert, setSelectedCert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const certsList = certificates.length > 0 ? certificates : [
    {
      certNo: 'CERT-2026-001',
      regNo: 'GP 88 KH ZP',
      engineNo: '4HK1-982341',
      makeModel: 'Isuzu NPR 400',
      year: '2022',
      vehicleType: 'Heavy Commercial / Box Body',
      odometer: '124,500 km',
      owner: 'Gauteng Logistics Fleet Co.',
      vin: 'N/A',
      category: 'B',
      outcome: 'PASS',
      inspectDate: '01-09-2026',
      nextDueDate: '01-09-2027',
      location: 'Mokopane Test Centre',
      inspectionType: 'Periodic Safety & Brake Audit',
      inspectorName: 'J. van der Merwe',
      inspectorId: 'TECH-8842',
      authorisedName: 'M. N. Muwanguzi',
      phone: '(015) 280 0156 | 087 093 6275',
      address: '17A Sussex Str, Mokopane, 0601',
      website: 'boschsmartfleet.com'
    }
  ];

  const filteredCerts = certsList.filter(
    (c) =>
      c.certNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.regNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.makeModel?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Opens Print Dialog
  const handlePrint = () => {
    window.print();
  };

  // Direct Automatic PDF Download
  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-certificate');
    if (!element) return;

    setIsDownloading(true);

    const opt = {
      margin:       0.2,
      filename:     `${selectedCert.certNo || 'Certificate'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => setIsDownloading(false))
      .catch((err) => {
        console.error('PDF Download Error:', err);
        setIsDownloading(false);
      });
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Compliance Certificates</h1>
        <p className="text-sm text-slate-500">
          Official roadworthiness and safety compliance verification records
        </p>
      </div>

      {/* Certificates Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Certificate No, Registration, or Model..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#005691]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm text-slate-600">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 uppercase">
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
              {filteredCerts.length > 0 ? (
                filteredCerts.map((cert, idx) => (
                  <tr key={cert.certNo || idx} className="hover:bg-slate-50 transition">
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
                        <Eye className="w-3.5 h-3.5" /> View Certificate
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    No certificates matching search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL-SCREEN / FIXED MODAL WITH ACTION BUTTONS BAR */}
      {selectedCert && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center z-50 overflow-y-auto p-4 sm:p-6">
          <style>{`
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-certificate, #printable-certificate * {
                visibility: visible;
              }
              #printable-certificate {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                margin: 0;
                padding: 0;
                box-shadow: none !important;
                border: none !important;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `}</style>

          <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-auto flex flex-col max-h-[92vh]">
            
            {/* TOP ACTION BAR */}
            <div className="bg-slate-900 text-white px-6 py-3.5 flex justify-between items-center print:hidden shrink-0 border-b border-slate-700">
              <button
                onClick={() => setSelectedCert(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-slate-600"
              >
                <ArrowLeft className="w-4 h-4" /> Back to List
              </button>

              <div className="flex items-center gap-2">
                {/* Print Button -> opens Print Window */}
                <button
                  onClick={handlePrint}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow"
                >
                  <Printer className="w-4 h-4" /> Print Certificate
                </button>

                {/* Download PDF Button -> triggers automatic .pdf download */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="bg-[#005691] hover:bg-sky-700 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isDownloading ? 'Generating PDF...' : 'Download PDF'}
                </button>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition cursor-pointer ml-2"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* SCROLLABLE CERTIFICATE DOCUMENT BODY */}
            <div className="overflow-y-auto p-6 sm:p-10 bg-white">
              <div id="printable-certificate" className="space-y-5 text-slate-900 font-sans text-xs max-w-3xl mx-auto border border-slate-200 p-8 rounded-lg shadow-sm bg-white">
                
                {/* Certificate Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-red-600 text-white px-2.5 py-1 font-black text-sm rounded tracking-wider">
                        BOSCH
                      </span>
                      <span className="text-slate-600 font-bold text-xs uppercase">Service</span>
                    </div>
                    <h1 className="text-xl font-black tracking-tight text-slate-900">
                      SMARTFLEET TECH AUDIT
                    </h1>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                      TECHNICAL INSPECTION & COMPLIANCE SERVICES
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                      DIGITAL INSPECTION VEHICLES FITNESS & COMPLIANCE
                    </p>
                    <p className="text-[10px] text-slate-500">
                      BRAKES, NOISE & LUX TESTING | NDT & LOAD TESTING
                    </p>
                    <h2 className="text-sm font-extrabold text-[#005691] mt-2 tracking-tight">
                      FITNESS & COMPLIANCE EXAMINATION CERTIFICATE
                    </h2>
                    <p className="text-xs font-mono font-bold text-slate-900">
                      CERTIFICATE NO: <span className="text-red-600">{selectedCert.certNo}</span>
                    </p>
                  </div>
                </div>

                {/* Vehicle Information Box */}
                <div className="border border-slate-300 rounded-lg p-3 bg-slate-50/50">
                  <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-2 border-b pb-1">
                    VEHICLE INFORMATION
                  </h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1.5 text-xs">
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Registration No:</span> <span className="font-bold">{selectedCert.regNo}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Vehicle Type / Body:</span> <span className="font-bold">{selectedCert.vehicleType || 'Heavy Commercial / Box Body'}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Engine Number:</span> <span className="font-mono font-bold">{selectedCert.engineNo}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Odometer Reading:</span> <span className="font-bold">{selectedCert.odometer}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Make/Model:</span> <span className="font-bold">{selectedCert.makeModel}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Owner/Operator:</span> <span className="font-bold">{selectedCert.owner}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">Year of Manufacture:</span> <span className="font-bold">{selectedCert.year}</span></div>
                    <div className="flex"><span className="w-36 font-semibold text-slate-600">VIN/Chassis No:</span> <span className="font-mono font-bold">{selectedCert.vin}</span></div>
                  </div>
                </div>

                {/* Examination Categories Grid */}
                <div>
                  <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-2">
                    EXAMINATION CATEGORIES
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: 'A', title: 'Bosch Pre-Pit Access/Entry Examination' },
                      { key: 'B', title: 'Bosch Pre-Pit Periodic Examination' },
                      { key: 'C', title: 'Bosch Pre-Pit Post-Service Examination' },
                      { key: 'D', title: 'Bosch Pre-Pit Special Engineering Examination' },
                    ].map((cat) => (
                      <div
                        key={cat.key}
                        className={`p-2 border rounded-md text-[10px] leading-tight ${
                          (selectedCert.category || 'B') === cat.key
                            ? 'border-[#005691] bg-sky-50 text-sky-950 font-bold ring-2 ring-[#005691]/20'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        <span className="block font-black text-sm mb-0.5">{cat.key}</span>
                        {cat.title}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Examination Outcome Box */}
                <div>
                  <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider mb-2">
                    EXAMINATION OUTCOME
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`p-3 rounded-lg border text-xs ${
                      (selectedCert.outcome || 'PASS') === 'PASS'
                        ? 'bg-emerald-500 text-white border-emerald-600 font-medium shadow-md'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      <p className="font-black text-sm mb-1">PASS</p>
                      <p className="text-[10px] leading-snug opacity-90">
                        The vehicle has PASSED the Technical Fitness & Compliance Examination and Meets the minimum required standards.
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs ${
                      selectedCert.outcome === 'PASS WITH CONDITION'
                        ? 'bg-amber-500 text-white border-amber-600 font-medium shadow-md'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      <p className="font-black text-sm mb-1">PASS WITH CONDITION</p>
                      <p className="text-[10px] leading-snug">
                        The vehicle has PASSED with CONDITION. Noted defects must be rectified within stipulated period.
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg border text-xs ${
                      selectedCert.outcome === 'FAIL'
                        ? 'bg-rose-600 text-white border-rose-700 font-medium shadow-md'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                      <p className="font-black text-sm mb-1">FAIL</p>
                      <p className="text-[10px] leading-snug">
                        The vehicle has FAILED the examination and does not meet minimum required standards.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fitness Banner */}
                <div className="bg-emerald-700 text-white text-center py-2 rounded-md font-black tracking-widest text-xs uppercase shadow-sm">
                  FITNESS & COMPLIANCE: ROADWORTHY, SAFE, COMPLIANT
                </div>

                {/* Inspection Details & Signatures Grid */}
                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-1.5 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <h4 className="font-extrabold text-slate-800 uppercase tracking-wider mb-1 border-b pb-1 text-[11px]">
                      INSPECTION DETAILS
                    </h4>
                    <div className="flex"><span className="w-32 text-slate-500">Date of Inspection:</span> <span className="font-bold">{selectedCert.inspectDate}</span></div>
                    <div className="flex"><span className="w-32 text-slate-500">Inspection Location:</span> <span className="font-bold">{selectedCert.location}</span></div>
                    <div className="flex"><span className="w-32 text-slate-500">Inspection Type:</span> <span className="font-bold">{selectedCert.inspectionType}</span></div>
                    <div className="flex"><span className="w-32 text-slate-500">Inspector Name:</span> <span className="font-bold">{selectedCert.inspectorName}</span></div>
                    <div className="flex"><span className="w-32 text-slate-500">Technician ID:</span> <span className="font-mono font-bold text-[#005691]">{selectedCert.inspectorId}</span></div>
                  </div>

                  <div className="space-y-3 bg-slate-50 p-3 rounded-lg border border-slate-200 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-extrabold text-slate-800 uppercase tracking-wider mb-1 border-b pb-1 text-[11px]">
                          AUTHORISED BY
                        </h4>
                        <p className="text-slate-600">Name: <span className="font-bold text-slate-900">{selectedCert.authorisedName}</span></p>
                        <p className="text-slate-600 mt-2">Signature: <span className="font-serif italic font-bold text-slate-800 underline">M.N. Muwanguzi</span></p>
                      </div>

                      <div className="w-20 h-20 rounded-full border-2 border-emerald-600 text-emerald-700 flex flex-col items-center justify-center text-center p-1 font-bold leading-none rotate-[-6deg] bg-emerald-50/50 shadow-sm">
                        <span className="text-[7px] tracking-tighter uppercase">BOSCH SMARTFLEET</span>
                        <span className="text-[9px] font-black my-0.5">{selectedCert.outcome || 'PASSED'}</span>
                        <span className="text-[6px] font-mono">{selectedCert.inspectDate}</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 pt-2 text-right">
                      <span className="text-[10px] text-slate-500 font-bold block uppercase">NEXT INSPECTION DUE</span>
                      <span className="text-sm font-black text-red-600 font-mono">{selectedCert.nextDueDate}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Banner */}
                <div className="border-t-2 border-slate-900 pt-3 flex justify-between items-end text-[10px] text-slate-500">
                  <div>
                    <p className="font-bold text-slate-800">VERIFIED. COMPLIANT. TRUSTED.</p>
                    <p className="text-[9px] text-slate-400">
                      IMPORTANT: Do not remove or tamper with this certificate or windscreen sticker.
                    </p>
                    <p className="text-[9px] text-slate-400">{selectedCert.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-700">{selectedCert.phone}</p>
                    <p className="font-bold text-[#005691]">{selectedCert.website}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}