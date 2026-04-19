'use client';
import { useStore } from '@/store';

export default function HistorySlider() {
  const histOffset = useStore((s) => s.histOffset);
  const candles = useStore((s) => s.candles);
  const setHistOffset = useStore((s) => s.setHistOffset);
  const setViewport = useStore((s) => s.setViewport);

  const handleChange = (val: number) => {
    const n = candles.length;
    const offset = Math.round(((100 - val) / 100) * Math.max(0, n - 1));
    setHistOffset(offset);
    setViewport({ panOffsetX: offset, panDeltaX: 0 });
  };

  const pct = candles.length > 1
    ? Math.round((1 - histOffset / Math.max(1, candles.length - 1)) * 100)
    : 100;

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 bg-[var(--bg2)] border-t border-[var(--b)] flex-shrink-0">
      <span className="text-[9px] text-[var(--mut)] whitespace-nowrap">Passé</span>
      <input
        type="range"
        min={0}
        max={100}
        value={pct}
        onChange={(e) => handleChange(+e.target.value)}
        className="flex-1"
        style={{ background: 'var(--b2)' }}
      />
      <span className="text-[9px] text-[var(--mut)] whitespace-nowrap">Récent</span>
      <span
        className="text-[10px] font-bold font-mono min-w-[52px] text-right"
        style={{ color: histOffset === 0 ? 'var(--blu)' : 'var(--org)' }}
      >
        {histOffset === 0 ? 'Live' : `−${histOffset}`}
      </span>
    </div>
  );
}
