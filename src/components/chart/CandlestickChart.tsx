'use client';
import { useRef } from 'react';
import { useChartRenderer } from '@/hooks/useChartRenderer';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useStore } from '@/store';
import { PAIRS } from '@/lib/constants';

export default function CandlestickChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapRef = useRef<HTMLCanvasElement>(null);
  const { spaceDown, handleMouseDown, handleMouseMove, handleMouseUp } = useKeyboardShortcuts();
  const pair = useStore((s) => s.pair);
  const viewport = useStore((s) => s.viewport);

  useChartRenderer(canvasRef, heatmapRef);

  const panOffset = Math.round(viewport.panOffsetX + viewport.panDeltaX);

  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{ cursor: spaceDown ? (panOffset !== 0 ? 'grabbing' : 'grab') : 'default' }}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        handleMouseMove(e, el.offsetWidth, el.offsetHeight, PAIRS[pair].atr);
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={heatmapRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div
        className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded px-2 py-0.5 text-[9px] pointer-events-none transition-colors
          bg-[rgba(20,25,38,.85)] border text-[var(--mut)]
          ${spaceDown ? 'border-[#5a3a00] text-[var(--org)]' : 'border-[var(--b2)]'}`}
      >
        ESPACE maintenu + glisser pour naviguer
      </div>
    </div>
  );
}
