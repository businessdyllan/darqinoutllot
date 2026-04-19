'use client';
import { useStore } from '@/store';

export default function Toast() {
  const show = useStore((s) => s.showToast);
  const msg = useStore((s) => s.toastMsg);
  const type = useStore((s) => s.toastType);

  const colorMap: Record<string, string> = {
    buy: 'border-[var(--gbrd)] text-[var(--grn)]',
    sell: 'border-[var(--rbrd)] text-[var(--red)]',
    info: 'border-[#5a3a00] text-[var(--org)]',
  };

  return (
    <div
      className={`fixed bottom-3 left-1/2 z-50 pointer-events-none whitespace-nowrap
        bg-[var(--card)] border rounded-lg px-4 py-2 text-[11px] font-semibold
        transition-transform duration-200
        ${colorMap[type] || colorMap.info}
        ${show ? '-translate-x-1/2 translate-y-0' : '-translate-x-1/2 translate-y-14'}`}
    >
      {msg}
    </div>
  );
}
