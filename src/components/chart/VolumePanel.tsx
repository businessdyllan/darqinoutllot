'use client';
import { useRef } from 'react';
import { useVolumeRenderer } from '@/hooks/useVolumeRenderer';
import { useStore } from '@/store';

export default function VolumePanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useVolumeRenderer(canvasRef);
  const cvd = useStore((s) => s.cvd);

  return (
    <div className="h-[72px] border-t border-[var(--b)] flex-shrink-0 relative bg-[var(--bg2)]">
      <span className="absolute top-0.5 left-2 text-[9px] text-[var(--mut)] z-10 uppercase tracking-wide">
        Volume + CVD
      </span>
      <span
        className={`absolute top-0.5 right-2 text-[10px] font-bold font-mono z-10 ${
          cvd >= 0 ? 'text-[var(--grn)]' : 'text-[var(--red)]'
        }`}
      >
        CVD: {cvd >= 0 ? '+' : ''}{Math.round(cvd / 1000)}K
      </span>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
