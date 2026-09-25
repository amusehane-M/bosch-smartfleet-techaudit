import React from 'react';

export default function StatusBadge({ status }) {
  const styles = {
    PASS: 'bg-[#10B981] text-white',
    FAIL: 'bg-[#EF4444] text-white',
    'N/A': 'bg-[#6B7280] text-white'
  };

  const icons = {
    PASS: '✓',
    FAIL: '⊗',
    'N/A': '⊘'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold shadow-sm ${styles[status] || styles['N/A']}`}>
      <span>{icons[status] || '⊘'}</span>
      <span>{status}</span>
    </span>
  );
}