'use client';
import { RefObject, useEffect, useCallback } from 'react';
import { useStore } from '@/store';
import { drawVolume, getVisRange } from '@/lib/chartMath';

export function useVolumeRenderer(canvasRef: RefObject<HTMLCanvasElement | null>) {
  const volBars = useStore((s) => s.volBars);
  const viewport = useStore((s) => s.viewport);
  const setCvd = useStore((s) => s.setCvd);

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const W = cv.parentElement?.offsetWidth || 0;
    const H = cv.parentElement?.offsetHeight || 0;
    if (!W || !H) return;
    cv.width = W;
    cv.height = H;

    const { start, end } = getVisRange(W, volBars.length, viewport);
    const vis = volBars.slice(start, end);

    const ctx = cv.getContext('2d');
    if (ctx) {
      const lastCvd = drawVolume(ctx, W, H, vis);
      if (lastCvd !== undefined) setCvd(lastCvd);
    }
  }, [volBars, viewport]);

  useEffect(() => { draw(); }, [draw]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(cv.parentElement!);
    return () => ro.disconnect();
  }, [draw]);
}
